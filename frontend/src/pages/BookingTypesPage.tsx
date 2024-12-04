import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import PropTypes from "prop-types";

const BookingTypesPage = ({ bookingTypes }) => {
  const [selectedBookingType, setSelectedBookingType] = useState([]);

  const handleSelectedBookingType = (event) => {
    const bookingType = event.target.value;
    setSelectedBookingType(bookingType);
    console.log("bookingType", selectedBookingType);
  };

  return (
    <Form>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridBooking">
          <Form.Label className="text-start w-100">
            Select a booking type
          </Form.Label>
          <Form.Select size="lg" onChange={handleSelectedBookingType}>
            <option aria-label="select a bookingType">
              Select a booking type
            </option>
            {bookingTypes.map(({ booking_type_id, booking_type_name }) => (
              <option key={booking_type_id} value={booking_type_name}>
                {booking_type_name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      </Row>
    </Form>
  );
};

export default BookingTypesPage;
