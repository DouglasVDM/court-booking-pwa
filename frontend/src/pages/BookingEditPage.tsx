import React from "react";
import BookingForm from "../pages/BookingForm";
import { toast } from "react-toastify";
import axios from "axios";
import useBookings from "../customHooks/useBookings"; // Ensure correct import

const apiEndpointPrefix = import.meta.env.VITE_API_ENDPOINT_PREFIX;

const BookingEditPage = ({ booking, onClose }) => {
  const { setBookings, refetch } = useBookings(apiEndpointPrefix);

  const handleUpdateBooking = async (updatedData) => {
    const updatedBooking = { ...booking, ...updatedData }; // Merge old and new data

    console.log("Editing booking: ", booking);
    console.log("Updated booking: ", updatedBooking);

    try {
      const response = await axios.put(
        `${apiEndpointPrefix}/bookings/${booking.booking_id}`,
        updatedBooking,
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 200) {
        if (setBookings) {
          setBookings((prev) =>
            prev.map((b) =>
              b.booking_id === booking.booking_id ? response.data : b
            )
          );
        }

        // Refresh bookings from API
        await refetch();

        toast.success("Booking updated successfully!");
        onClose();
      } else {
        toast.error("Failed to update booking.");
      }
    } catch (error) {
      console.error("Error updating booking:", error);
      toast.error(error.response?.data?.message || "An unexpected error occurred.");
    }
  };

  return (
    <BookingForm
      booking={booking}
      onSubmit={handleUpdateBooking}
      onCancel={onClose}
    />
  );
};

export default BookingEditPage;
