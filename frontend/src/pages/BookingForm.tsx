import React, { useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import DatePickerPage from "../components/DatePickerPage";
import CourtsPage from "./CourtsPage";
import BookingTypesPage from "./BookingTypesPage";
import TimeSelector from "./TimeSelector";

import useCourts from "../customHooks/useCourts";
import useBookingTypes from "../customHooks/useBookingTypes";
import useStartTimes from "../customHooks/useStartTimes";
import useEndTimes from "../customHooks/useEndTimes";
import useFetchMemberId from "../customHooks/useFetchMemberId";

const apiEndpointPrefix = import.meta.env.VITE_API_ENDPOINT_PREFIX;
console.log("apiEndpointPrefix:", apiEndpointPrefix);

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

  const { user } = useAuth0(); // Access the logged-in user
  const userEmail = user?.email || null; // Extract email
  console.log(userEmail);

  const {
    memberId,
    loading: memberLoading,
    error: memberError,
  } = useFetchMemberId(apiEndpointPrefix);
  console.log("memberId:", memberId);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (memberLoading) {
      alert("Please wait while we fetch your member information...");
      return;
    }

    if (!memberId) {
      alert("Unable to identify the logged-in member. Please try again.");
      return;
    }

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
      member_id: memberId, // Use the dynamic member ID
      booking_date: bookingDate,
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

      {memberError && <div className="alert alert-danger">{memberError}</div>}

      <Row className="mb-3">
        <Col md={6}>
          <Form.Group controlId="bookingDate">
            <Form.Label>Select a Booking Date</Form.Label>
            <DatePickerPage
              selectedDate={bookingDate ? new Date(bookingDate) : null} // Pass null if bookingDate is empty
              onDateChange={(date) =>
                setBookingDate(date ? date.toISOString().split("T")[0] : "")
              }
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
                  onStartTimeSelect={(id) => setStartTimeId(id)}
                  onEndTimeSelect={(id) => setEndTimeId(id)}
                />
              </Col>
            </Row>
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={6}>
          <Form.Group className="mb-3" controlId="bookingTypeId">
            <Form.Label>Select Booking Type</Form.Label>
            <BookingTypesPage
              bookingTypes={bookingTypes}
              onBookingTypeSelect={(id) => setBookingTypeId(id)}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="courtId">
            <Form.Label>Select Court</Form.Label>
            <CourtsPage
              courts={courts}
              onCourtSelect={(id) => setCourtId(id)}
            />
          </Form.Group>
        </Col>
      </Row>

      <div className="d-flex justify-content-center mt-4">
        <Button
          type="submit"
          variant="primary"
          disabled={
            !bookingDate ||
            !startTimeId ||
            !endTimeId ||
            !bookingTypeId ||
            !courtId
          }
        >
          Submit Booking
        </Button>
      </div>
    </Form>
  );
};

export default BookingForm;
