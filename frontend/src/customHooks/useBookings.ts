import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const useBookings = (apiEndpointPrefix: string, refreshKey: number) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch bookings function
  const fetchBookings = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${apiEndpointPrefix}/bookings`);
      setBookings(response.data);
    } catch (err) {
      console.error("Error fetching bookings:", err.message);
      setError(err.message || "Failed to fetch bookings.");
    } finally {
      setLoading(false);
    }
  }, [apiEndpointPrefix, refreshKey]);

  // Fetch bookings on mount
  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  return { bookings, setBookings, loading, error, refetch: fetchBookings };
};

export default useBookings;
