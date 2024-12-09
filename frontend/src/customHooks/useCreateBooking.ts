import { useState } from "react";
import axios from "axios";

export const useCreateBooking = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createBooking = async (bookingData: any) => {
    setLoading(true);
    try {
      await axios.post("/api/bookings", bookingData);
    } catch (err) {
      setError(err.message || "An error occurred while creating the booking");
    } finally {
      setLoading(false);
    }
  };

  return { createBooking, loading, error };
};
