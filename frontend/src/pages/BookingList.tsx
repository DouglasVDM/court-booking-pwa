import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { toast } from "react-toastify";

import BookingCard from "../components/BookingCard";
import BookingEditPage from "./BookingEditPage";

import useDeleteBooking from "../customHooks/useDeleteBooking";

const BookingsList = ({
  bookings,
  setBookings,
  apiEndpointPrefix,
  currentMemberId,
}) => {
  const { deleteBooking } = useDeleteBooking(apiEndpointPrefix);
  const [editingBooking, setEditingBooking] = useState(null);

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this booking?"))
      return;

    await deleteBooking(bookingId);
    setBookings((prev) =>
      prev.filter((booking) => booking.booking_id !== bookingId)
    );
    toast.success("Booking cancelled successfully!");
  };

  return (
    <>
      {editingBooking ? (
        <BookingEditPage
          booking={editingBooking}
          onClose={() => setEditingBooking(null)}
          setBookings={setBookings}
        />
      ) : (
        <Row>
          <h2>Bookings</h2>
          {bookings.map((booking) => (
            <Col key={booking.booking_id} md={4}>
              <BookingCard
                booking={booking}
                onCancelBooking={handleCancelBooking}
                onEditBooking={setEditingBooking}
                currentMemberId={currentMemberId}
              />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default BookingsList;
