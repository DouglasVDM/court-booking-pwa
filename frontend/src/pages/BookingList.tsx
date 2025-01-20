import React from "react";
import Card from "react-bootstrap/Card";
import { CardTitle, Row } from "react-bootstrap";
import Col from "react-bootstrap/Col";

const BookingsList = ({ bookings, loading, error}) => {

  if (loading) return <div>Loading bookings...</div>;
  if (error) return <div>Error: {error}</div>;
  if (bookings.length === 0) return <div>No bookings found.</div>;

  return (
    <Row>
      <h2>Bookings</h2>
      {bookings.map((booking) => (
        <Col key={booking.booking_id} md={4}>
          <Card>
            <CardTitle>
              {booking.first_name}_{booking.surname}
            </CardTitle>
            <Card.Text>
              <strong>Court:</strong> {booking.court_id} <br />
              <strong>Type:</strong> {booking.booking_type_name} <br />
              <strong>Date:</strong>
              {new Date(booking.booking_date).toLocaleDateString()} <br />
              <strong>Start:</strong> {booking.start_time} <br />
              <strong>End:</strong> {booking.end_time}
            </Card.Text>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default BookingsList;
