import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import BookingCard from "../components/BookingCard"; // Import the BookingCard component

const BookingsList = ({ bookings, loading, error, onCancelBooking }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  if (loading) return <div>Loading bookings...</div>;
  if (error) return <div>Error: {error}</div>;
  if (bookings.length === 0) return <div>No bookings found.</div>;

  // Filter and Search Logic
  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      `${booking.first_name} ${booking.surname}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      booking.court_id.includes(searchTerm);
    const matchesType =
      filterType === "all" || booking.booking_type_name === filterType;

    return matchesSearch && matchesType;
  });

  return (
    <>
      {/* Search and Filter Section */}
      <Row className="mb-3">
        <Col md={6}>
          <InputGroup>
            <InputGroup.Text>Search</InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Name or Court"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </Col>
        <Col md={6}>
          <Form.Select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="Singles">Singles</option>
            <option value="Doubles">Doubles</option>
            <option value="Practice">Practice</option>
          </Form.Select>
        </Col>
      </Row>

      {/* Bookings Display */}
      <Row>
        <h2>Bookings</h2>
        {filteredBookings.map((booking) => (
          <Col key={booking.booking_id} md={4}>
            <BookingCard
              booking={booking}
              onCancelBooking={onCancelBooking}
            />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default BookingsList;
