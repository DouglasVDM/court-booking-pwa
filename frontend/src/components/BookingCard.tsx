import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const BookingCard = ({
  booking,
  onCancelBooking,
  onEditBooking,
  currentMemberId,
}) => {
  const isOwner = booking.member_id === currentMemberId;

  console.log("isOwner: ", isOwner);
console.log("booking: ", booking);
console.log("currentMemberId: ", currentMemberId);
console.log("bookingMemberId: ", booking.member_id);

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
          <strong>Date:</strong>
          {new Date(booking.booking_date).toLocaleDateString()} <br />
          <strong>Start:</strong> {booking.start_time} <br />
          <strong>End:</strong> {booking.end_time}
        </Card.Text>

        {isOwner && (
          <Button
            variant="primary"
            size="sm"
            onClick={() => onEditBooking(booking.booking_id)}
          >
            Edit
          </Button>
        )}

        <Button
          variant="danger"
          size="sm"
          onClick={handleCancelClick}
        >
          Cancel Booking
        </Button>
      </Card.Body>
    </Card>
  );
};

export default BookingCard;
