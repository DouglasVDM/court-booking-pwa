import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

interface Booking {
  booking_id: string;
  member_id: string;
  first_name: string;
  surname: string;
  court_id: number;
  booking_type_name: string;
  booking_date: string;
  start_time: string;
  end_time: string;
}

interface BookingCardProps {
  booking: Booking;
  onCancelBooking: (bookingId: string) => void;
  onEditBooking: (booking: Booking) => void;
  currentMemberId: string;
}

const BookingCard: React.FC<BookingCardProps> = ({
  booking,
  onCancelBooking,
  onEditBooking,
  currentMemberId,
}) => {
  const isOwner = booking.member_id === currentMemberId;

  const handleCancelClick = () => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      onCancelBooking(booking.booking_id);
    }
  };

  return (
    <Card className="mb-3 shadow-sm">
      <Card.Body>
        <Card.Title>
          {booking.first_name} {booking.surname}
        </Card.Title>
        <Card.Text>
          <strong>Court:</strong> {booking.court_id} <br />
          <strong>Type:</strong> {booking.booking_type_name} <br />
          <strong>Date:</strong>{" "}
          {new Date(booking.booking_date).toLocaleDateString()} <br />
          <strong>Start:</strong> {booking.start_time} <br />
          <strong>End:</strong> {booking.end_time}
        </Card.Text>

        {isOwner && (
          <div className="d-flex gap-2">
            <Button
              variant="primary"
              size="sm"
              onClick={() => onEditBooking(booking)}
            >
              Edit
            </Button>
            <Button variant="danger" size="sm" onClick={handleCancelClick}>
              Cancel Booking
            </Button>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default BookingCard;
