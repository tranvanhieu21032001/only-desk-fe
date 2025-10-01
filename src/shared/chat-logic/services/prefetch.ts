// LIMIT THE FILE CONTENT TO AT MOST 300 LINES. IF MORE CONTENT NEEDS TO BE ADDED USE THE str-replace-editor TOOL TO EDIT THE FILE AFTER IT HAS BEEN CREATED.

import {
  createOperationDescriptor,
  fetchQuery,
  getFragment,
  getRequest,
  graphql,
} from 'relay-runtime';
import environment from '@/relay/RelayEnvironment';
import { Conversation } from '@/shared/interfaces/conversation.interface';
import { MESSAGE_LIMIT } from '@/modules/inbox/constants/inbox.constants';
import { prefetch_ConversationMessagesQuery } from './__generated__/prefetch_ConversationMessagesQuery.graphql';
import { conversationMessagesQuery } from '../relay/ConversationMessagesQuery';
import { ConversationMessagesQuery } from '../relay/__generated__/ConversationMessagesQuery.graphql';
import { messageListFragment } from '../relay/MessageFragment';

// Track prefetched conversationIds to avoid duplicate network calls
// Always store as string to avoid 8 vs "8" mismatches
const prefetched = new Set<string>();
// Track in-flight requests so multiple triggers can coalesce and we don't mark
// as prefetched until data actually lands in the Relay store.
const inFlight = new Map<string, Promise<unknown>>();

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
) {
  const id = normalizeId(conversationId);
  if (!id) return;
  if (hasPrefetched(conversationId)) return;

  // If a request for this id is already in flight, reuse it
  const existing = getPrefetchInFlight(conversationId);
  if (existing) {
    return existing;
  }

  try {
    const p = fetchQuery<ConversationMessagesQuery>(
      environment as any,
      conversationMessagesQuery,
      {
        conversationId: id,
        first: MESSAGE_LIMIT,
        after: null,
      },
    );
    inFlight.set(id, p.toPromise());

    await p.toPromise();

    prefetched.add(id);

    console.log('[prefetch] done', id);
    return true;
  } catch (error) {
    console.warn('[prefetch] error', id, error);
  } finally {
    inFlight.delete(id);
  }
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
    // Skip already prefetched items inside batch as well
    const toPrefetch = batch
      .map((c) => normalizeId(c.rawId))
      .filter((id): id is string => !!id && !prefetched.has(id));

    if (toPrefetch.length > 0) {
      await Promise.all(
        toPrefetch.map((id) => prefetchMessagesForConversation(id)),
      );
    }

    if (i + batchSize < total) {
      await new Promise((r) => setTimeout(r, delayMs));
    }
  }
}
