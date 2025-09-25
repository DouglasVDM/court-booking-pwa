import React, { useState, useEffect } from "react";
import { Button, Form, Row, Col, Toast } from "react-bootstrap";
import { toast } from "react-toastify";
import DatePickerPage from "./DatePickerPage";

import useCourts from "../customHooks/useCourts";
import useBookingTypes from "../customHooks/useBookingTypes";

const apiEndpointPrefix = import.meta.env.VITE_API_ENDPOINT_PREFIX;

interface Booking {
  booking_date: string;
  court_id: number | null;
  booking_type_id: number | null;
  start_time: string;
  end_time: string;
}

interface BookingFormProps {
  booking?: Booking;
  onSubmit: (data: Booking) => void;
  onCancel: () => void;
}

const BookingForm: React.FC<BookingFormProps> = ({
  booking,
  onSubmit,
  onCancel
}) => {
  const { courts } = useCourts(apiEndpointPrefix);
  const { bookingTypes } = useBookingTypes(apiEndpointPrefix);

  const [formData, setFormData] = useState<Booking>({
    booking_date: "",
    court_id: null,
    booking_type_id: null,
    start_time: "",
    end_time: "",
  });

  const [endTimes, setEndTimes] = useState<string[]>([])

  // Function to generate time options for select dropdown
  const generateTimeOptions = (
    startHour: number,
    endHour: number,
    interval: number
  ) => {
    const times = [];
    let currentTime = new Date();
    currentTime.setHours(startHour, 0, 0, 0);

    const endTime = new Date();
    endTime.setHours(endHour, 0, 0, 0);

    while (currentTime <= endTime) {
      times.push(currentTime.toTimeString().slice(0, 5));
      currentTime.setMinutes(currentTime.getMinutes() + interval);
    }
    return times;
  }

  const [startTimes] = useState(() => generateTimeOptions(6, 22, 30));

  // ✅ Pre-fill form if editing an existing booking
  useEffect(() => {
    if (booking) {
      setFormData(booking);
    }
  }, [booking]);

  // Update end times when start time changes
  useEffect(() => {
    if (formData.start_time) {
      const startIndex = startTimes.indexOf(formData.start_time);
      const newEndTimes = startTimes.slice(startIndex + 1);
      setEndTimes(newEndTimes);
      
    } else {
      setEndTimes([]);
    }
  }, [formData.start_time, startTimes]);

  // Handle changes for all fields
  const handleChange = (field: keyof Booking, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Handle form submission
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!formData.start_time || !formData.end_time) {
      toast.error("Please select both a start and end time.");
      return;
    }

    if (formData.start_time >= formData.end_time) {
      toast.error("Start time must be before end time.");
      return;
    }

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
              selectedDate={
                formData.booking_date
                  ? new Date(formData.booking_date)
                  : null
              }
              onDateChange={(date) =>
                handleChange(
                  "booking_date",
                  date ? date.toISOString().split("T")[0] : ""
                )
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
                <Form.Select
                  value={formData.start_time}
                  onChange={(event) => handleChange("start_time", event.target.value)}
                >
                  <option value="">Start Time</option>
                  {startTimes.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              <Col>
                <Form.Select
                  value={formData.end_time}
                  onChange={(event) => handleChange("end_time", event.target.value)}
                  disabled={!formData.start_time}
                >
                  <option value="">End Time</option>
                  {endTimes.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Row>
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={6}>
          <Form.Group controlId="bookingTypeId">
            <Form.Label>Select Booking Type</Form.Label>
            <Form.Select
              value={formData.booking_type_id || ""}
              onChange={(e) =>
                handleChange("booking_type_id", Number(e.target.value))
              }
            >
              <option value="">Select a Booking Type</option>
              {bookingTypes.map((type) => (
                <option key={type.booking_type_id} value={type.booking_type_id}>
                  {type.booking_type_name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="courtId">
            <Form.Label>Select Court</Form.Label>
            <Form.Select
              value={formData.court_id || ""}
              onChange={(event) =>
                handleChange("court_id", Number(event.target.value))
              }
            >
              <option value="">Select a Court</option>
              {courts.map((court) => (
                <option key={court.court_id} value={court.court_id}>
                  {court.court_name}
                </option>
              ))}
            </Form.Select>
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
