import { useState, useEffect } from "react";

const useFetch = (url, options = []) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    setData([]);

    const controller = new AbortController()

    fetch(url, { signal: controller.signal, ...options }).then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res)
    })
    .then(data => {
      setData(data);
      setIsLoading(false);
    })
    .catch(e => {
      if (e.name === "AbortError") return

      setIsError(true)
    })
    .finally(() => {
      if (controller.signal.aborted) return
      setIsLoading(false)
    })

    return () => {
      controller.abort();
    }
  }, [url]);


  return {
    data,
    isLoading,
    isError
  };
}

export default useFetch;