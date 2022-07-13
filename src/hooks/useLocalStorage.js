/* eslint-disable no-console */
import { useState } from "react";

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const storedItem = window.localStorage.getItem(key);
      return storedItem ? storedItem : initialValue;
    } catch (err) {
      console.error(err);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      if (!value) {
        setStoredValue(null);
        localStorage.removeItem(key);
        return;
      }
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;

      setStoredValue(valueToStore);

      window.localStorage.setItem(key, valueToStore);
    } catch (err) {
      console.error(err);
    }
  };

  return [storedValue, setValue];
}

export default useLocalStorage;
