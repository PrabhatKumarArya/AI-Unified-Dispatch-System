import { useState, useEffect, useCallback } from "react";
import api from "../services/api";

/**
 * Generic data-fetching hook using the configured axios instance.
 * @param {string} url - API endpoint path (e.g., "/orders")
 * @param {any} [initialData=null] - initial data value
 */
export default function useFetch(url, initialData = null) {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    if (!url) return;
    setLoading(true);
    setError(null);
    try {
      const res = await api.get(url);
      setData(res.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Failed to fetch");
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
