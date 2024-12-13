import React, { useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import DatePickerPage from "../components/DatePickerPage";
import CourtsPage from "./CourtsPage";
import BookingTypesPage from "./BookingTypesPage";
import TimeSelector from "./TimeSelector";

import useCourts from "../customHooks/useCourts";
import useBookingTypes from "../customHooks/useBookingTypes";
import useStartTimes from "../customHooks/useStartTimes";
import useEndTimes from "../customHooks/useEndTimes";

const apiEndpointPrefix = import.meta.env.VITE_API_ENDPOINT;

const BookingForm: React.FC = () => {
  const [bookingDate, setBookingDate] = useState<string>("");
  const [courtId, setCourtId] = useState<number | null>(null);
  const [bookingTypeId, setBookingTypeId] = useState<number | null>(null);
  const [startTimeId, setStartTimeId] = useState<number | null>(null);
  const [endTimeId, setEndTimeId] = useState<number | null>(null);

  const { courts } = useCourts(apiEndpointPrefix);
  const { bookingTypes } = useBookingTypes(apiEndpointPrefix);
  const { startTimes } = useStartTimes(apiEndpointPrefix);
  const { endTimes } = useEndTimes(apiEndpointPrefix);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (
      !bookingDate ||
      !courtId ||
      !bookingTypeId ||
      !startTimeId ||
      !endTimeId
    ) {
      alert("Please complete all fields before submitting.");
      return;
    }

    const bookingPayload = {
      member_id: 3, // Assuming hardcoded for MVP; replace with logged-in user ID later.
      booking_date: "2024-12-12" /*bookingDate,*/,
      start_time_id: startTimeId,
      end_time_id: endTimeId,
      booking_type_id: bookingTypeId,
      court_id: courtId,
    };

    try {
      const response = await fetch(`${apiEndpointPrefix}/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingPayload),
      });

      if (response.ok) {
        alert("Booking created successfully!");
      } else {
        const error = await response.json();
        alert(`Error: ${error.message || "Failed to create booking."}`);
      }
    } catch (error) {
      console.error("Error submitting booking:", error);
      alert("An unexpected error occurred.");
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="p-4">
      <h2 className="mb-4">Book a Court</h2>
      {/* 
      <Form.Group className="mb-3" controlId="bookingDate">
        <Form.Label>Select Booking Date</Form.Label>
        <DatePickerPage selectedDate={new Date(bookingDate)} onDateChange={(date)=>setBookingDate(date.toISOString().split("T")[0])} />
      </Form.Group> */}

      <Row>
        <TimeSelector
          startTimes={startTimes}
          endTimes={endTimes}
          onStartTimeSelect={(id) => setStartTimeId(id)}
          onEndTimeSelect={(id) => setEndTimeId(id)}
        />
      </Row>
      <Row>
        <Form.Group className="mb-3" controlId="bookingTypeId">
          <BookingTypesPage
            bookingTypes={bookingTypes}
            onBookingTypeSelect={(id) => setBookingTypeId(id)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="courtId">
          <CourtsPage courts={courts} onCourtSelect={(id) => setCourtId(id)} />
        </Form.Group>
      </Row>
      <Button type="submit" variant="primary" className="mt-3">
        Submit Booking
      </Button>
    </Form>
  );
};

export default BookingForm;
