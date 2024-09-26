import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    setData([]);

    const controller = new AbortController()

    async function fetchData() {
      try {
        const res = await fetch(url, { signal: controller.signal })
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await res.json();
        setData(result)
      }
      catch (e) {
        if (e.name === "AbortError") return
        setIsError(true)
        setError(e)
      }
      finally {
        if (controller.signal.aborted) return
        setIsLoading(false)
      }
    }
    fetchData();

    return () => {
      controller.abort();
    }
  }, [url]);

  return {
    data,
    isLoading,
    isError,
    error
  };
}

export default useFetch;