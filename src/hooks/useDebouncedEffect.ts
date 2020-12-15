/* eslint-disable react-hooks/exhaustive-deps */
import { DependencyList, useCallback, useEffect, useRef } from 'react';

export const useDebouncedEffect = (effect, delay: number, deps: DependencyList) => {
  const callback = useCallback(effect, deps);

  const isFirstUpdate = useRef(true);

  useEffect(() => {
    if (isFirstUpdate.current) {
      isFirstUpdate.current = false;
      return;
    }

    const handler = setTimeout(() => {
      callback();
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [callback, delay]);
};
