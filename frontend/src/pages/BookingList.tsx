import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import BookingCard from "../components/BookingCard";
import BookingEditPage from "./BookingEditPage.tsx";
import useDeleteBooking from "../customHooks/useDeleteBooking";

interface BookingsListProps {
  bookings: any[];
  apiEndpointPrefix: string;
  currentMemberId: number;
  loading: boolean;
  error: string | null;
  triggerRefresh: () => void; // ✅ Add this
}

const BookingsList: React.FC<BookingsListProps> = ({
  bookings,
  loading,
  error,
  apiEndpointPrefix,
  currentMemberId,
  triggerRefresh,
}) => {
  const { deleteBooking, error: deleteError } = useDeleteBooking(apiEndpointPrefix);
  const [editingBooking, setEditingBooking] = useState(null);

  console.log("currentMemberId", currentMemberId);


  const handleCancelBooking = async (bookingId: number) => {
    if (!window.confirm("Are you sure you want to cancel this booking?"))
      return;

    await deleteBooking(bookingId);
    triggerRefresh(); // 🔁 Refresh bookings after deletion
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
          refetchBookings={triggerRefresh} // ✅ pass to edit page
        />
      ) : (
        <Row>
          <h2>Bookings</h2>
          {bookings.map(
            (booking) => (
              console.log("booking", booking),
              (
                <Col key={booking.booking_id} md={4}>
                  <BookingCard
                    booking={booking}
                    onCancelBooking={handleCancelBooking}
                    onEditBooking={setEditingBooking}
                    currentMemberId={currentMemberId}
                  />
                </Col>
              )
            )
          )}
        </Row>
      )}
    </>
  );
};

export default BookingsList;
