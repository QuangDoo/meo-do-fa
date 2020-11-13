import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export default function useLocalStorage(localStorageKey: string) {
  const [value, setValue] = useState<string>(localStorage.getItem(localStorageKey) || '');

  useEffect(() => {
    localStorage.setItem(localStorageKey, value);
  }, [value]);

  return [value, setValue] as [string, Dispatch<SetStateAction<string>>];
}
