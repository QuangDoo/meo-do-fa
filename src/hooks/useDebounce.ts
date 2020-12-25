/* eslint-disable react-hooks/exhaustive-deps */
import debounce from 'lodash.debounce';
import { useCallback } from 'react';

export default function useDebounce(callback, delay: number) {
  const debouncedFn = useCallback(
    debounce((...args) => callback(...args), delay),
    [delay]
  );

  return debouncedFn;
}
