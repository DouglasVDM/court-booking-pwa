import React, { useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const BookingEditPage = ({ booking, onClose, apiEndpointPrefix, setBookings }) => {
  const [updatedBooking, setUpdatedBooking] = useState({ ...booking });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setUpdatedBooking({ ...updatedBooking, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.put(`${apiEndpointPrefix}/bookings/${booking.booking_id}`, updatedBooking);
      if (response.status === 200) {
        setBookings((prev) =>
          prev.map((b) => (b.booking_id === booking.booking_id ? updatedBooking : b))
        );
        onClose(); // Close edit form
      }
    } catch (err) {
      setError("Error updating booking. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-booking-modal">
      <h3>Edit Booking</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Court</Form.Label>
          <Form.Control type="text" name="court_id" value={updatedBooking.court_id} onChange={handleChange} />
        </Form.Group>

        <Form.Group>
          <Form.Label>Start Time</Form.Label>
          <Form.Control type="time" name="start_time" value={updatedBooking.start_time} onChange={handleChange} />
        </Form.Group>

        <Form.Group>
          <Form.Label>End Time</Form.Label>
          <Form.Control type="time" name="end_time" value={updatedBooking.end_time} onChange={handleChange} />
        </Form.Group>

        <Button type="submit" variant="primary" disabled={loading}>
          {loading ? "Updating..." : "Update Booking"}
        </Button>
        <Button variant="secondary" onClick={onClose} className="ms-2">
          Cancel
        </Button>
      </Form>
    </div>
  );
};

export default BookingEditPage;
