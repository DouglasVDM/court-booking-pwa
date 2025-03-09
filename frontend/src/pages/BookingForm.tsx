import React, { useState, useEffect } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";

import DatePickerPage from "./DatePickerPage";
import CourtsPage from "./CourtsPage";
import BookingTypesPage from "./BookingTypesPage";
import TimeSelector from "./TimeSelector";

import useCourts from "../customHooks/useCourts";
import useBookingTypes from "../customHooks/useBookingTypes";
import useStartTimes from "../customHooks/useStartTimes";
import useEndTimes from "../customHooks/useEndTimes";

const apiEndpointPrefix = import.meta.env.VITE_API_ENDPOINT_PREFIX;

interface Booking {
  booking_date: string;
  court_id: number | null;
  booking_type_id: number | null;
  start_time_id: number | null;
  end_time_id: number | null;
}

interface BookingFormProps {
  booking?: Booking;
  onSubmit: (data: Booking) => void;
  onCancel: () => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ booking, onSubmit, onCancel }) => {
  const { courts } = useCourts(apiEndpointPrefix);
  const { bookingTypes } = useBookingTypes(apiEndpointPrefix);
  const { startTimes } = useStartTimes(apiEndpointPrefix);
  const { endTimes } = useEndTimes(apiEndpointPrefix);

  const [formData, setFormData] = useState<Booking>({
    booking_date: "",
    court_id: null,
    booking_type_id: null,
    start_time_id: null,
    end_time_id: null,
  });

  // ✅ Pre-fill form if editing an existing booking
  useEffect(() => {
    if (booking) {
      setFormData(booking);
    }
  }, [booking]);

  // ✅ Handle changes for all fields
  const handleChange = (field: keyof Booking, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // ✅ Handle form submission
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(formData);
  };

  return (
    <Form onSubmit={handleSubmit} className="p-4">
      <h2 className="mb-4">{booking ? "Edit Booking" : "Book a Court"}</h2>

      <Row className="mb-3">
        <Col md={6}>
          <Form.Group controlId="bookingDate">
            <Form.Label>Select a Booking Date</Form.Label>
            <DatePickerPage
              selectedDate={formData.booking_date}
              onDateChange={(date) => handleChange("booking_date", date)}
              className="form-control"
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="timeSelector">
            <Form.Label>Select Start and End Time</Form.Label>
            <Row>
              <Col>
                <TimeSelector
                  startTimes={startTimes}
                  endTimes={endTimes}
                  selectedStartTimeId={formData.start_time_id}
                  selectedEndTimeId={formData.end_time_id}
                  onStartTimeSelect={(id) => handleChange("start_time_id", id)}
                  onEndTimeSelect={(id) => handleChange("end_time_id", id)}
                />
              </Col>
            </Row>
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={6}>
          <Form.Group controlId="bookingTypeId">
            <Form.Label>Select Booking Type</Form.Label>
            <BookingTypesPage
              bookingTypes={bookingTypes}
              selectedBookingTypeId={formData.booking_type_id}
              onBookingTypeSelect={(id) => handleChange("booking_type_id", id)}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="courtId">
            <Form.Label>Select Court</Form.Label>
            <CourtsPage
              courts={courts}
              selectedCourtId={formData.court_id}
              onCourtSelect={(id) => handleChange("court_id", id)}
            />
          </Form.Group>
        </Col>
      </Row>

      <div className="d-flex justify-content-between mt-4">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="primary">
          {booking ? "Update Booking" : "Submit Booking"}
        </Button>
      </div>
    </Form>
  );
};

export default BookingForm;
