import { OperationType } from 'relay-runtime';
import { useLazyLoadQuery, GraphQLTaggedNode } from 'react-relay';

export function useRelayQuery<TQuery extends OperationType>(
  query: GraphQLTaggedNode,
  variables: Record<string, any> = {},
  options?: Parameters<typeof useLazyLoadQuery>[2],
): TQuery['response'] {
  return useLazyLoadQuery<TQuery>(query, variables, options);
}
