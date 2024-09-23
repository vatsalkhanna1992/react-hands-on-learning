import { useCallback, useState } from "react";

const useArray = (initialValue) => {

  const [array, setArray] = useState(initialValue);

  const set = useCallback(newArr => {
    setArray(newArr);
  }, []);

  const push = useCallback(num => {
    setArray((array) => {
      return [...array, num];
    });
  }, []);

  const replace = useCallback((index, newValue) => {
    const updatedArray = array.map((num, i) => {
      if (i === index) {
        return newValue;
      }

      return num;
    })

    setArray(updatedArray);
  }, [array]);

  const filter = useCallback(func => {
    const updatedArray = array.filter(func)

    setArray(updatedArray);
  }, [array]);

  const remove = useCallback(index => {
    setArray(a => {
      return [...a.slice(0, index), ...a.slice(index + 1)]
    })
  }, []);

  const clear = useCallback(() => {
    setArray([]);
  }, []);

  const reset = useCallback(() => {
    setArray(initialValue);
  }, [initialValue]);

  return {
    array,
    set,
    push,
    replace,
    filter,
    remove,
    clear,
    reset
  }
}

export default useArray;