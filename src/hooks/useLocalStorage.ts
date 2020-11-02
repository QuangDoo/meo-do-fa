import { useEffect, useState } from 'react';

export default function useLocalStorage<T = string>(
  key: string
): [T | string, (newValue: T) => void] {
  const [storedValue, setStoredValue] = useState<T | string>();

  // Update state when local storage changes
  useEffect(() => {
    function updateData() {
      let data: T | string;

      try {
        data = JSON.parse(localStorage.getItem(key));
      } catch (error) {
        data = localStorage.getItem(key);
      }

      setStoredValue(data);
    }

    updateData();

    window.addEventListener('storage', updateData);

    return () => window.removeEventListener('storage', updateData);
  }, [key]);

  // Set new value to localStorage
  function setValue(newValue: T) {
    localStorage.setItem(key, JSON.stringify(newValue));
  }

  return [storedValue, setValue];
}
