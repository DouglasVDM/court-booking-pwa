import React from "react";
import BookingForm from "../pages/BookingForm";
import { toast } from "react-toastify";

const apiEndpointPrefix = import.meta.env.VITE_API_ENDPOINT_PREFIX;

const BookingEditPage = ({ booking, onClose, setBookings }) => {
  const handleUpdateBooking = async (updatedData) => {
    try {
      const response = await fetch(`${apiEndpointPrefix}/bookings/${booking.booking_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        setBookings((prev) =>
          prev.map((b) => (b.booking_id === booking.booking_id ? updatedData : b))
        );
        toast.success("Booking updated successfully!");
        onClose();
      } else {
        const error = await response.json();
        toast.error(`Error: ${error.message || "Failed to update booking."}`);
      }
    } catch (error) {
      console.error("Error updating booking:", error);
      toast.error("An unexpected error occurred.");
    }
  };

  return <BookingForm booking={booking} onSubmit={handleUpdateBooking} onCancel={onClose} />;
};

export default BookingEditPage;
