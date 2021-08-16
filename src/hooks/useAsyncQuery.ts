import {
  ApolloError,
  DocumentNode,
  OperationVariables,
  QueryOptions,
  useApolloClient
} from '@apollo/client';
import { TypedQueryDocumentNode } from 'graphql';
import { useState } from 'react';
import { useToken } from 'src/contexts/Token';

/*************************************
 *  Supports:                        *
 *    - .then() and .catch()         *
 *    - onCompleted() and onError()  *
 *    - data, loading, error states  *
 *************************************/

// gql query
type Query<TData, TVariables> = DocumentNode | TypedQueryDocumentNode<TData, TVariables>;

// Type for client.query
export type ClientQueryOptions<TData, TVariables> = Omit<QueryOptions<TVariables, TData>, 'query'>;

// Type for hook's options
export type AsyncQueryOptions<TData, TVariables> = ClientQueryOptions<TData, TVariables> & {
  onCompleted?: (data: TData) => void;
  onError?: (error: ApolloError) => void;
};

// Type for async query function
// (options) => Promise
export type AsyncQueryFunction<TData, TVariables> = (
  options?: ClientQueryOptions<TData, TVariables>
) => Promise<TData>;

/**
 * This hook returns:
 *  [
 *    (options) => Promise,
 *    {
 *      loading,
 *      data,
 *      error,
 *    }
 *  ]
 */
export type AsyncQueryReturnType<TData, TVariables> = [
  AsyncQueryFunction<TData, TVariables>,
  {
    loading: boolean;
    data?: TData;
    error?: ApolloError;
  }
];

export default function useAsyncQuery<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TData = any,
  TVariables = OperationVariables
>(
  query: Query<TData, TVariables>,
  options?: AsyncQueryOptions<TData, TVariables>
): AsyncQueryReturnType<TData, TVariables> {
  const { onCompleted, onError, ...queryOptions } = options || {};

  const token = useToken();

  // Loading state
  const [loading, setLoading] = useState<boolean>(false);

  // Error state
  const [error, setError] = useState<ApolloError>();

  // Data state
  const [data, setData] = useState<TData>();

  // Apollo client to query
  const client = useApolloClient();

  const asyncQuery = async (_queryOptions?: ClientQueryOptions<TData, TVariables>) => {
    try {
      // Loading
      setLoading(true);

      // Query
      const response = await client.query<TData, TVariables>({
        query,
        // Options provided on hook
        ...queryOptions,
        // Options provided when running query function
        // Will override/merge with options provided on hook
        ..._queryOptions,
        context: {
          ...queryOptions?.context,
          ..._queryOptions?.context,
          headers: {
            ...queryOptions?.context?.headers,
            ..._queryOptions?.context?.headers,
            authorization: token || ''
          }
        }
      });

      // Finish loading
      setLoading(false);

      // Set data to state
      setData(response.data);

      // Always run onCompleted if provided
      onCompleted?.(response.data);

      // Return resolve with data for .then() usage
      return Promise.resolve(response.data);
    } catch (error) {
      // Finish loading
      setLoading(false);

      // Set error to state
      setError(error);

      // Always run onError if provided
      onError?.(error);

      // Return reject with error for .catch() usage
      return Promise.reject(error);
    }
  };

  return [asyncQuery, { loading, error, data }];
}
