import { useEffect, useRef } from 'react';

const useDidUpdate = (callback, deps) => {
  const mounted = useRef(false);

  useEffect(() => {
    if (mounted.current) {
      callback();
    } else {
      mounted.current = true;
    }
  }, deps);
};

export default useDidUpdate;
