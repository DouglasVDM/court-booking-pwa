import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import BookingCard from "../components/BookingCard";
import useDeleteBooking from "../customHooks/useDeleteBooking";
import BookingEditPage from "./BookingEditPage";

const BookingsList = ({
  bookings,
  setBookings,
  loading,
  error,
  apiEndpointPrefix,
  currentMemberId,
}) => {
  const {
    deleteBooking,
    loading: deleting,
    error: deleteError,
  } = useDeleteBooking(apiEndpointPrefix);
console.log("currentMemberId", currentMemberId);

  const [editingBooking, setEditingBooking] = useState(null);

  const handleCancelBooking = async (bookingId: number) => {
    if (!window.confirm("Are you sure you want to cancel this booking?"))
      return;

    await deleteBooking(bookingId);

    // Remove the deleted booking from state
    setBookings((prev) =>
      prev.filter((booking) => booking.booking_id !== bookingId)
    );
  };

  if (loading) return <div>Loading bookings...</div>;
  if (error) return <div>Error: {error}</div>;
  if (bookings.length === 0) return <div>No bookings found.</div>;

  return (
    <>
      {deleteError && <div className="alert alert-danger">{deleteError}</div>}

      {editingBooking ? (
        <BookingEditPage
          booking={editingBooking}
          onClose={() => setEditingBooking(null)}
          apiEndpointPrefix={apiEndpointPrefix}
          setBookings={setBookings}
        />
      ) : (
        <Row>
          <h2>Bookings</h2>
          {bookings.map((booking) => (
            console.log("booking", booking),
            <Col key={booking.booking_id} md={4}>
              <BookingCard
                booking={booking}
                onCancelBooking={handleCancelBooking}
                onEditBooking={setEditingBooking}
                currentMemberId={currentMemberId} // Pass logged-in user's ID
              />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default BookingsList;
