import { useLazyQuery, useMutation, useQuery } from '@apollo/client';

function useHookAuth(query, options = {}, hookFunc) {
  const token = global?.localStorage?.getItem('token');
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

export function useLazyQueryAuth(query, options?: any) {
  return useHookAuth(query, options, useLazyQuery);
}

export function useQueryAuth(query, options?: any) {
  return useHookAuth(query, options, useQuery);
}

export function useMutationAuth(query, options?: any) {
  return useHookAuth(query, options, useMutation);
}
