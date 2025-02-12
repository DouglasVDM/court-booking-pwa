import React from "react";
import useFetchBooking from "../customHooks/useFetchBooking";
import BookingForm from "./BookingForm";

const BookingEditPage: React.FC<{ apiEndpointPrefix: string; bookingId: number }> = ({
  apiEndpointPrefix,
  bookingId,
}) => {
  const { booking, loading, error } = useFetchBooking(apiEndpointPrefix, bookingId);

  if (loading) return <p>Loading booking...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!booking) return <p>Booking not found.</p>;

  return <BookingForm existingBooking={booking} />;
};

export default BookingEditPage;
