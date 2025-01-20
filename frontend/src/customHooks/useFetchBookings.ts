import { useState, useEffect } from "react";
import axios from "axios";

const useFetchBookings = (apiEndpointPrefix) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const fetchBookingResponse = await axios.get(
          `${apiEndpointPrefix}/bookings`
        );
        if (!fetchBookingResponse) {
          throw new Error("Failed to fetch bookings.");
        }
        setBookings(fetchBookingResponse.data);
      } catch (err) {
        console.error("Error fetching bookings:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, [apiEndpointPrefix]);

  return { bookings, setBookings, loading, error };
};

export default useFetchBookings;
