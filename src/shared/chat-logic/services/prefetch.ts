// LIMIT THE FILE CONTENT TO AT MOST 300 LINES. IF MORE CONTENT NEEDS TO BE ADDED USE THE str-replace-editor TOOL TO EDIT THE FILE AFTER IT HAS BEEN CREATED.

import {
  Disposable,
  createOperationDescriptor,
  fetchQuery,
  getRequest,
} from 'relay-runtime';
import environment from '@/relay/RelayEnvironment';
import { Conversation } from '@/shared/interfaces/conversation.interface';
import { MESSAGE_LIMIT } from '@/modules/inbox/constants/inbox.constants';
import { ProfileCache } from '@/shared/utils/profile-cache';
import { conversationMessagesQuery } from '../relay/ConversationMessagesQuery';
import {
  ConversationMessagesQuery,
  ConversationMessagesQuery$data,
} from '../relay/__generated__/ConversationMessagesQuery.graphql';
import { userProfileCardQuery } from '@/relay/UserProfileCardQuery';
import { contactProfileCardQuery } from '@/relay/ContactProfileCardQuery';
import { UserProfileCardQuery } from '@/relay/__generated__/UserProfileCardQuery.graphql';
import { ContactProfileCardQuery } from '@/relay/__generated__/ContactProfileCardQuery.graphql';

// Track prefetched conversationIds to avoid duplicate network calls (store string form)
const prefetched = new Set<string>();
// Track in-flight requests so multiple triggers can coalesce and we only mark after success
const inFlight = new Map<string, Promise<ConversationMessagesQuery$data | null>>();
// Keep retain handles so Relay GC does not drop prefetched messages prematurely
const retentions = new Map<string, Disposable>();

export function getPrefetchInFlight(conversationId: string | number) {
  const id = normalizeId(conversationId);
  if (!id) return undefined;
  return inFlight.get(id);
}

function normalizeId(id: string | number | null | undefined): string | null {
  if (id === null || id === undefined) return null;
  return String(id);
}

export function hasPrefetched(conversationId: string | number) {
  const id = normalizeId(conversationId);
  if (!id) return false;
  return prefetched.has(id);
}

export async function prefetchMessagesForConversation(
  conversationId: string | number,
  meta?: {
    contactId?: string | null;
    participantIds?: Array<string | null | undefined> | null;
  },
) {
  const id = normalizeId(conversationId);
  if (!id) return;
  if (hasPrefetched(conversationId)) return;

  // If a request for this id is already in flight, reuse it
  const existing = getPrefetchInFlight(conversationId);
  if (existing) {
    return existing;
  }

  await prefetchConversationProfilesFromMeta(meta);
  const variables = {
    conversationId: id,
    first: MESSAGE_LIMIT,
    after: null,
  };

  // Retain the prefetched operation so Relay's GC does not immediately
  // evict the data before the user opens the conversation.
  const request = getRequest(conversationMessagesQuery);
  const operation = createOperationDescriptor(request, variables);

  if (!retentions.has(id)) {
    const retainHandle = environment.retain(operation);
    retentions.set(id, retainHandle);
  }
  try {
    const promise = fetchQuery<ConversationMessagesQuery>(
      environment as any,
      conversationMessagesQuery,
      variables,
    ).toPromise();

    inFlight.set(id, promise);

    const result = await promise;

    await prefetchProfilesFromMessages(result);

    prefetched.add(id);

    console.log('[prefetch] done', id);
    return true;
  } catch (error) {
    console.warn('[prefetch] error', id, error);
    const retainHandle = retentions.get(id);
    retainHandle?.dispose();
    retentions.delete(id);
  } finally {
    inFlight.delete(id);
  }
}

export function releasePrefetchedConversation(
  conversationId: string | number,
) {
  const id = normalizeId(conversationId);
  if (!id) return;
  const retainHandle = retentions.get(id);
  if (retainHandle) {
    retainHandle.dispose();
    retentions.delete(id);
  }
  prefetched.delete(id);
}

export function releaseAllPrefetchedConversations() {
  retentions.forEach((retainHandle) => retainHandle.dispose());
  retentions.clear();
  prefetched.clear();
}

// Progressive prefetch in batches (e.g., 5 by 5)
export async function progressivePrefetchConversations(
  conversations: Conversation[],
  batchSize: number = 5,
  options?: { delayMs?: number; signal?: AbortSignal },
) {
  const total = conversations.length;
  const delayMs = options?.delayMs ?? 150;
  const shouldAbort = () => options?.signal?.aborted;

  // Find first index that hasn't been prefetched yet to avoid redundant passes
  let startIndex = 0;
  for (let i = 0; i < total; i++) {
    const id = normalizeId(conversations[i].rawId);
    if (!id || !prefetched.has(id)) {
      startIndex = i;
      break;
    } else {
      startIndex = i + 1; // move forward while already prefetched
    }
  }

  for (let i = startIndex; i < total; i += batchSize) {
    if (shouldAbort()) {
      console.log('shouldAbort');
      break;
    }
    const batch = conversations.slice(i, Math.min(i + batchSize, total));

    await Promise.allSettled(batch.map(prefetchConversationProfiles));

    const toPrefetch = batch.filter((conversation) => {
      const convId = normalizeId(conversation.rawId);
      return convId != null && !prefetched.has(convId);
    });

    if (toPrefetch.length > 0) {
      await Promise.all(
        toPrefetch.map((conversation) =>
          prefetchMessagesForConversation(conversation.rawId, {
            contactId: conversation.contact?.id ?? null,
            participantIds: extractParticipantIds(conversation.participants),
          }),
        ),
      );
    }

    if (i + batchSize < total) {
      await new Promise((r) => setTimeout(r, delayMs));
    }
  }
}

async function prefetchConversationProfilesFromMeta(
  meta?: {
    contactId?: string | null;
    participantIds?: Array<string | null | undefined> | null;
  },
) {
  if (!meta) return;
  const tasks: Promise<void>[] = [];
  if (meta.contactId) tasks.push(prefetchContactProfile(meta.contactId));
  if (meta.participantIds?.length) {
    const unique = new Set<string>();
    for (const id of meta.participantIds) {
      if (!id || unique.has(id)) continue;
      unique.add(id);
      tasks.push(prefetchUserProfile(id));
    }
  }
  if (tasks.length) await Promise.allSettled(tasks);
}

async function prefetchConversationProfiles(conversation: Conversation) {
  const contactId = conversation.contact?.id ?? null;
  const participantIds = extractParticipantIds(conversation.participants);
  await prefetchConversationProfilesFromMeta({ contactId, participantIds });
}

function extractParticipantIds(
  participants: Conversation['participants'] | undefined,
): Array<string | null | undefined> {
  if (!participants?.length) return [];
  return participants.map((participant: any) =>
    !participant ? null : typeof participant === 'string' ? participant : participant.id ?? null,
  );
}

async function prefetchProfilesFromMessages(
  result: ConversationMessagesQuery$data | null,
) {
  if (!result) return;
  const connection = (result as any)?.messages;
  const edges: any[] = connection?.edges || [];
  if (edges.length === 0) return;

  const tasks: Promise<void>[] = [];
  const seenUsers = new Set<string>();

  for (const edge of edges) {
    const node = edge?.node;
    if (!node) continue;
    const userId: string | null = node.user?.id ?? null;
    if (userId && !seenUsers.has(userId) && !ProfileCache.has('USER', userId)) {
      seenUsers.add(userId);
      tasks.push(prefetchUserProfile(userId));
    }
    const replyUserId: string | null = node.replyTo?.user?.id ?? null;
    if (
      replyUserId &&
      !seenUsers.has(replyUserId) &&
      !ProfileCache.has('USER', replyUserId)
    ) {
      seenUsers.add(replyUserId);
      tasks.push(prefetchUserProfile(replyUserId));
    }
  }

  if (tasks.length) await Promise.allSettled(tasks);
}

async function prefetchUserProfile(id: string) {
  if (!id) return;
  if (ProfileCache.has('USER', id)) return;

  try {
    const data = await fetchQuery<UserProfileCardQuery>(
      environment as any,
      userProfileCardQuery,
      { id },
      { fetchPolicy: 'network-only' },
    ).toPromise();

    const node = data?.node as any;
    if (!node) return;

    const normalized = {
      name: `${node.firstName ?? ''} ${node.lastName ?? ''}`.trim(),
      email: node.email ?? undefined,
      avatar: node.avatar ?? undefined,
    };

    ProfileCache.set('USER', id, normalized);
  } catch (error) {
    console.warn('[prefetch] user profile error', id, error);
  }
}

async function prefetchContactProfile(id: string) {
  if (!id) return;
  if (ProfileCache.has('CONTACT', id)) return;

  try {
    const data = await fetchQuery<ContactProfileCardQuery>(
      environment as any,
      contactProfileCardQuery,
      { id },
      { fetchPolicy: 'network-only' },
    ).toPromise();

    const node = data?.node as any;
    if (!node) return;

    const normalized = {
      name: node.name ?? undefined,
      email: node.email ?? undefined,
      avatar: node.avatar ?? undefined,
      countryCode: node.context?.countryCode ?? undefined,
    };

    ProfileCache.set('CONTACT', id, normalized);
  } catch (error) {
    console.warn('[prefetch] contact profile error', id, error);
  }
}
