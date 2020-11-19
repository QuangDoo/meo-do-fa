import { useEffect, useState } from 'react';

export default function useLocalStorage(key: string) {
  const [storedValue, setStoredValue] = useState<string>(null);

  useEffect(() => {
    setStoredValue(localStorage.getItem(key));
  }, []);

  const setValue = (newValue: string) => {
    localStorage.setItem(key, newValue);
    setStoredValue(newValue);
  };

  const remove = () => {
    setStoredValue(null);
    localStorage.removeItem(key);
  };

  return [storedValue, setValue, remove] as const;
}
