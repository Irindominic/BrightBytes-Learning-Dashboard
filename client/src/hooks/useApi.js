import { useState, useEffect, useRef } from "react";

export function useApi(apiFn) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const hasRunRef = useRef(false);

  useEffect(() => {
    if (hasRunRef.current) return;
    hasRunRef.current = true;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await apiFn();
        console.log("API Response:", res.data);
        setData(res.data);
      } catch (err) {
        console.error("API Error:", err);
        setError(err?.response?.data || err?.message || "Request failed");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiFn]);

  const refetch = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiFn();
      console.log("API Refetch Response:", res.data);
      setData(res.data);
      return res.data;
    } catch (err) {
      console.error("API Refetch Error:", err);
      setError(err?.response?.data || err?.message || "Request failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, refetch };
}
