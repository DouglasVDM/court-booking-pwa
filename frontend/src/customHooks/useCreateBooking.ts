import { useState } from "react";
import axios from "axios";

const useCreateBooking = (apiEndpointPrefix: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createBooking = async (data: any, memberId: number, onSuccess?: () => void) => {
    if (!memberId) {
      console.error("Member ID is missing.");
      return;
    }

    setLoading(true);
    setError(null);

    const bookingData = { ...data, member_id: memberId };

    try {
      await axios.post(`${apiEndpointPrefix}/bookings`, bookingData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      alert("Booking created successfully!");
      if (onSuccess) onSuccess(); // ✅ Callback for successful booking
    } catch (error: any) {
      console.error("Error creating booking:", error.response?.data || error.message);
      setError(error.response?.data?.message || error.message);
      alert(`Error creating booking. Please try again. ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return { createBooking, loading, error };
};

export default useCreateBooking;
