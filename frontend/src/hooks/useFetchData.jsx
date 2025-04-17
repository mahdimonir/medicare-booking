import { useEffect, useState } from "react";

function useFetchData(url, refresh) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        if (!token) {
          throw new Error("No token found. Please log in.");
        }

        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Handle unauthorized access
        if (response.status === 401) {
          localStorage.removeItem("token");
          setError("Unauthorized access. Please log in again.");
          return;
        }

        // Parse the response
        const contentType = response.headers.get("Content-Type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Invalid response format. Expected JSON.");
        }

        const result = await response.json();

        // Handle API errors
        if (!response.ok || !result.success) {
          throw new Error(result.message || "Failed to fetch data");
        }

        // Set the fetched data
        setData(result.data);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, refresh, token]);

  return { data, loading, error };
}

export default useFetchData;
