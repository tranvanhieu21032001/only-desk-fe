import { useLazyLoadQuery, GraphQLTaggedNode } from 'react-relay';
import { OperationType } from 'relay-runtime';

export function useRelayQuery<TQuery extends OperationType>(
  query: GraphQLTaggedNode,
  variables: Record<string, any> = {},
  options?: Parameters<typeof useLazyLoadQuery>[2],
): TQuery['response'] {
  try {
    const data = useLazyLoadQuery<TQuery>(query, variables, options);
    return data;
  } catch (error) {
    throw error;
  }
}
