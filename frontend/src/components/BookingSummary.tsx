import React from "react";
import { Button } from "react-bootstrap";

interface BookingSummaryProps {
  court: string | undefined;
  date: string;
  timeSlot: { start: string; end: string };
  floodlights: boolean;
  onConfirm: () => void;
}

const BookingSummary: React.FC<BookingSummaryProps> = ({
  court,
  date,
  timeSlot,
  floodlights,
  onConfirm,
}) => (
  <div>
    <h4>Booking Summary</h4>
    <p>
      <strong>Court:</strong> {court || "Not Selected"}
    </p>
    <p>
      <strong>Date:</strong> {date || "Not Selected"}
    </p>
    <p>
      <strong>Time:</strong> {timeSlot.start} - {timeSlot.end}
    </p>
    <p>
      <strong>Floodlights:</strong> {floodlights ? "Yes" : "No"}
    </p>
    <Button variant="primary" onClick={onConfirm}>
      Confirm Booking
    </Button>
  </div>
);

export default BookingSummary;