import { fetchQuery } from 'relay-runtime';
import relayEnvironment from '@/relay/RelayEnvironment';
import { parseGraphQLConversation } from '../helpers/chat.helper';
import { CoversationDetailsForListQuery } from '../relay/__generated__/CoversationDetailsForListQuery.graphql';
import { coversationDetailsForListQuery } from '../relay/CoversationDetailsForListQuery';

export const fetchConversationDetailForList = async (
  conversationId: string,
) => {
  try {
    const result = await fetchQuery<CoversationDetailsForListQuery>(
      relayEnvironment,
      coversationDetailsForListQuery,
      { id: conversationId },
      { fetchPolicy: 'network-only' },
    ).toPromise();

    if (result?.node) {
      return parseGraphQLConversation(result.node);
    }

    return null;
  } catch (error: any) {
    console.error('Failed to fetch conversation detail:', error);
    return null;
  }
};
