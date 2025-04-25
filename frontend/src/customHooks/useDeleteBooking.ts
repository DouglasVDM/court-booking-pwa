import { useState } from "react";
import axios from "axios";

const useDeleteBooking = (apiEndpointPrefix: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteBooking = async (bookingId: number, onSuccess?: () => void) => {
    setLoading(true);
    setError(null);

    try {
      await axios.delete(`${apiEndpointPrefix}/bookings/${bookingId}`);
      if (onSuccess) onSuccess(); // Callback to update UI if needed
    } catch (err: any) {
      console.error("Error deleting booking:", err.message);
      setError(err.message || "Failed to delete booking.");
    } finally {
      setLoading(false);
    }
  };

  return { apiEndpointPrefix, deleteBooking, loading, error };
};

export default useDeleteBooking;
