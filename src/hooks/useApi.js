import { useState } from 'react';
import axios from 'axios';

const useApi = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async (payload) => {
    setLoading(true);
    setData(null); // Reset previous data before fetching new data
    setError(null); // Reset error state

    try {
      const response = await axios.post(url, payload);
      setData(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, fetchData };
};

export default useApi;
    