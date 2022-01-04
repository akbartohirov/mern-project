import { useState, useCallback } from "react";
import axios from "axios";

const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const postReq = useCallback(async (url, body = null, config = {}) => {
    setLoading(true);
    try {
      const data = await axios.post(url, body, { headers: config });
      setLoading(false);
      return data;
    } catch (e) {
      setLoading(false);
      setError("something went wrong");
    }
  }, []);

  const getReq = useCallback(async (url, config = {}) => {
    setLoading(true);
    try {
      const data = await axios.get(url, { headers: config });
      setLoading(false);
      return data;
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  }, []);

  const clearError = useCallback(() => setError(null), []);

  return { loading, error, postReq, getReq, clearError };
};

export default useHttp;
