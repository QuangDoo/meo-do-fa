import { useEffect, useState } from 'react';

export default function useLocalStorage(key: string) {
  const [storedValue, setStoredValue] = useState<string>(null);

  useEffect(() => {
    // Initial value
    setStoredValue(localStorage.getItem(key));

    function onStorageChange() {
      setStoredValue(localStorage.getItem(key));
    }

    // Set value again when storage changes
    window.addEventListener('storage', onStorageChange);

    // Remove event on unmount
    return () => window.removeEventListener('storage', onStorageChange);
  }, [key]);

  const setValue = (newValue: string) => {
    localStorage.setItem(key, newValue);
  };

  const remove = () => {
    localStorage.removeItem(key);
  };

  return [storedValue, setValue, remove] as const;
}
