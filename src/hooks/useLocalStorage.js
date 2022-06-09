import { useState, useEffect } from "react";

export const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    let currentValue;

    let tmp = defaultValue === undefined ? null : defaultValue

    try {
      currentValue = JSON.parse(
        localStorage.getItem(key) || String(tmp)
      );
    } catch (error) {
      currentValue = defaultValue;
    }

    return currentValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return { value, setValue };
};
