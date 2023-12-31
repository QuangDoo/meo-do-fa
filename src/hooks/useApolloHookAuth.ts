import {
  DocumentNode,
  LazyQueryHookOptions,
  MutationHookOptions,
  MutationTuple,
  OperationVariables,
  QueryHookOptions,
  QueryResult,
  QueryTuple,
  TypedDocumentNode,
  useLazyQuery,
  useMutation,
  useQuery
} from '@apollo/client';
import { useToken } from 'src/contexts/Token';

function useHookAuth(query, options = {}, hookFunc) {
  const token = useToken();

  const newOptions = {
    ...options,
    context: {
      headers: {
        authorization: token || ''
      }
    }
  };
  return hookFunc(query, newOptions);
}

export function useLazyQueryAuth<TData, TVariables = OperationVariables>(
  query: DocumentNode | TypedDocumentNode<TData, TVariables>,
  options?: LazyQueryHookOptions<TData, TVariables>
): QueryTuple<TData, TVariables> {
  return useHookAuth(query, options, useLazyQuery);
}

export function useQueryAuth<TData, TVariables = OperationVariables>(
  query: DocumentNode | TypedDocumentNode<TData, TVariables>,
  options?: QueryHookOptions<TData, TVariables>
): QueryResult<TData, TVariables> {
  return useHookAuth(query, options, useQuery);
}

export function useMutationAuth<TData, TVariables = OperationVariables>(
  mutation: DocumentNode | TypedDocumentNode<TData, TVariables>,
  options?: MutationHookOptions<TData, TVariables>
): MutationTuple<TData, TVariables> {
  return useHookAuth(mutation, options, useMutation);
}
