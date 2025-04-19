import React from "react";
import { toast } from "react-toastify";

import BookingForm from "./BookingForm";
import useUpdateBooking from "../customHooks/useUpdateBooking";

const apiEndpointPrefix = import.meta.env.VITE_API_ENDPOINT_PREFIX;

const BookingEditPage: React.FC<BookingEditPageProps> = ({
  booking,
  onClose,
  refetchBookings,
}) => {
  const { updateBooking } = useUpdateBooking(apiEndpointPrefix);
  console.log("Before updating booking: ", booking);

  const handleUpdateBooking = async (updatedData) => {
    try {
      await updateBooking(booking.booking_id, updatedData);
      
      if (refetchBookings) {
        await refetchBookings(); // Refetch latest bookings after update
      }

      toast.success("🎾 Booking updated successfully!");
      onClose(); // Close the form/modal after successful update
    } catch (error) {
      console.error("Error updating booking", error);
      toast.error("❌ Failed to update booking.");
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
