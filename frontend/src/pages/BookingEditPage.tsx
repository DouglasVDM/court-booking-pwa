import React from "react";
import BookingForm from "../pages/BookingForm";
import { toast } from "react-toastify";
import axios from "axios";

import useFetchBooking from "../customHooks/useFetchBooking"; // Ensure correct import
import useUpdateBooking from "../customHooks/useUpdateBooking";

const apiEndpointPrefix = import.meta.env.VITE_API_ENDPOINT_PREFIX;

interface Booking {
  booking_id: string;
  // Add other booking properties here
}

interface BookingEditPageProps {
  booking: Booking;
  onClose: () => void;
}

const BookingEditPage: React.FC<BookingEditPageProps> = ({
  booking,
  onClose,
}) => {
  const { setBooking, refetch } = useFetchBooking<Booking[]>(apiEndpointPrefix);
  const { updateBooking } = useUpdateBooking(apiEndpointPrefix);
  
  console.log("Before updating booking: ", booking);

  const handleUpdateBooking = async (updatedData) => {
    const updatedBooking = { ...booking, ...updatedData }; // Merge old and new data

    console.log("Sending booking update: ", updatedBooking);
    try {
      const response = await updateBooking(booking.booking_id, updatedBooking);

      setBooking(response);

      // Refresh bookings from API

      if (response.status === 200) {
        await refetch();
        toast.success("Booking updated successfully!");
        onClose();
      } else {
        toast.error("Failed to update booking.");
      }
    } catch (error) {
      console.error("Error updating booking:", error);
      toast.error(
        error.response?.data?.message || "An unexpected error occurred."
      );
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
