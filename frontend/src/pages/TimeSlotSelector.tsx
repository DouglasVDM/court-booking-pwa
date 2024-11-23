import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import PropTypes from "prop-types";

interface TimeSlot {
  start_time: string;
  end_time: string;
}

const TimeSlotSelector = ({ timeSlots }) => {
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  console.log(timeSlots);
  return (
    <Form.Group>
      <Form.Label>Available Time Slots</Form.Label>
      <Form.Select
        value={selectedSlot ? `${selectedSlot.start_time}-${selectedSlot.end_time}` : ""}
        onChange={(e) => {
          const [start_time, end_time] = e.target.value.split("-");
          setSelectedSlot({ start_time, end_time });
        }}
      >
        <option value="" disabled>
          Select a time slot
        </option>
        {timeSlots.map((slot, index) => (
          <option key={index} value={`${slot.start_time}-${slot.end_time}`}>
            {slot.start_time} - {slot.end_time}
          </option>
        ))}
      </Form.Select>
    </Form.Group>
  );
};

export default TimeSlotSelector;

/**
 * 
import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import PropTypes from "prop-types";

const BookingTypesPage = ({ bookingTypes }) => {
  
  const [selectedBookingType, setSelectedBookingType] = useState(null);

  const handleClick = (event) => {
    const selectedBookingType = bookingTypes.find(
      (bookingType) => bookingType.booking_type_id === parseInt(event.target.value)
    );
    console.log("selectedBookingType", selectedBookingType);
    console.log("event.target.value", event.target.value);
    console.log("bookingTypes", bookingTypes);
    setSelectedBookingType(selectedBookingType);
  };

  return (
    <>
      <Form>
        {" "}
        <Form.Group as={Row} className="mb-3">
          <Form.Label as="legend" column sm={2}>
            Please select your booking type
          </Form.Label>
          {bookingTypes.map(({ booking_type_id, booking_type_name, has_lights }) => (
            <Col key={booking_type_id} sm={15}>
              <Form.Label>
                <p>{has_lights}</p>
              </Form.Label>
              <Form.Check
                onClick={handleClick}
                type="radio"
                label={
                  <span>
                    {booking_type_name}{" "}
                    {has_lights && (
                      <span style={{ color: "green", marginLeft: "10px" }}>
                        (Has Lights)
                      </span>
                    )}
                  </span>
                }
                name="selectedBookingType"
                id={booking_type_id}
                value={booking_type_id}
              />
            </Col>
          ))}
        </Form.Group>
      </Form>
    </>
  );
};

BookingTypesPage.propTypes = {
  bookingTypes: PropTypes.arrayOf(
    PropTypes.shape({
      booking_type_id: PropTypes.number.isRequired,
      booking_type_name: PropTypes.string.isRequired,
    })
  ).isRequired,
  //   onbookingTypeselected: PropTypes.func.isRequired,
};

export default BookingTypesPage;

 */
