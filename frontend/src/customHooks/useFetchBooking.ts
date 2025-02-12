import { useState, useEffect } from "react";
import axios from "axios";

const useFetchBooking = (apiEndpointPrefix: string, bookingId?: number) => {
  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!bookingId) return;

    const fetchBooking = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${apiEndpointPrefix}/bookings/${bookingId}`);
        setBooking(response.data);
      } catch (err: any) {
        console.error("Error fetching booking:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [apiEndpointPrefix, bookingId]);

  return { booking, loading, error, setBooking };
};

export default useFetchBooking;
