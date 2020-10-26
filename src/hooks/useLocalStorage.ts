import { useEffect, useState } from 'react'

export default function useLocalStorage<T>(key: string) {
  const [storedValue, setStoredValue] = useState<T>(JSON.parse(localStorage.getItem(key)))

  // Update state when local storage changes
  useEffect(() => {
    function updateData() {
      setStoredValue(JSON.parse(localStorage.getItem(key)))
    }

    window.addEventListener('storage', updateData)

    return () => window.removeEventListener('storage', updateData)
  }, [])

  // Set new value to localStorage
  function setValue(newValue: T) {
    localStorage.setItem(key, JSON.stringify(newValue))
  }

  return [storedValue, setValue]
}
