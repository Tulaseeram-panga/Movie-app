import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [dataa, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: "API_KEY",
        },
      };
      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        setData(result);
        // console.log(result);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { dataa, loading, error };
};

export default useFetch;
