import { ApolloError, ApolloQueryResult, OperationVariables, QueryOptions } from '@apollo/client';

import getToken from './getToken';

type Params<T, TVariables> = QueryOptions<TVariables, T> & {
  ctx;
  auth?: boolean;
  onCompleted?: (data: T) => void;
  onError?: (error: ApolloError) => void;
};

export default async function asyncQuery<T = any, TVariables = OperationVariables>(
  params: Params<T, TVariables>
): Promise<ApolloQueryResult<T>> {
  let queryResults: ApolloQueryResult<T>;

  const { ctx, auth, onCompleted, onError, ...rest } = params;

  const queryOptions = { ...rest };

  if (auth) {
    queryOptions.context = {
      headers: {
        Authorization: getToken(ctx)
      }
    };
  }

  try {
    queryResults = await ctx.apolloClient.query(queryOptions);
  } catch (error) {
    onError?.(error);
    return;
  }

  onCompleted?.(queryResults.data);

  return queryResults;
}
