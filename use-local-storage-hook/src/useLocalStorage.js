import { useState, useEffect } from "react";

const useLocalStorage = (key, defaultValue) => {

  const [value, setValue] = useState(() => {
    const localValue = localStorage.getItem(key)
    if (localValue == null) {
      if (typeof defaultValue === "function") {
        return defaultValue()
      }
      else {
        return defaultValue
      }
    }
    else {
      return JSON.parse(localValue)
    }
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [value, key])

  return [
    value,
    setValue
  ];
}

export default useLocalStorage;