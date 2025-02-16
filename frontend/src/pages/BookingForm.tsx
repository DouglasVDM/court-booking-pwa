import React, { useEffect } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import DatePickerPage from "./DatePickerPage";
import CourtsPage from "./CourtsPage";
import BookingTypesPage from "./BookingTypesPage";
import TimeSelector from "./TimeSelector";

import useCourts from "../customHooks/useCourts";
import useBookingTypes from "../customHooks/useBookingTypes";
import useStartTimes from "../customHooks/useStartTimes";
import useEndTimes from "../customHooks/useEndTimes";

const apiEndpointPrefix = import.meta.env.VITE_API_ENDPOINT_PREFIX;

interface BookingFormProps {
  booking?: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const BookingForm: React.FC<BookingFormProps> = ({
  booking,
  onSubmit,
  onCancel,
}) => {
  const { courts } = useCourts(apiEndpointPrefix);
  const { bookingTypes } = useBookingTypes(apiEndpointPrefix);
  const { startTimes } = useStartTimes(apiEndpointPrefix);
  const { endTimes } = useEndTimes(apiEndpointPrefix);

  const {
    handleSubmit,
    setValue,
    reset, // ✅ Reset form when editing
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      booking_date: "",
      court_id: null,
      booking_type_id: null,
      start_time_id: null,
      end_time_id: null,
    },
  });

  // ✅ Reset form when `booking` is passed
  useEffect(() => {
    if (booking) {
      reset({
        booking_date: booking.booking_date,
        court_id: booking.court_id,
        booking_type_id: booking.booking_type_id,
        start_time_id: booking.start_time_id,
        end_time_id: booking.end_time_id,
      });
    }
  }, [booking, reset]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="p-4">
      <h2 className="mb-4">{booking ? "Edit Booking" : "Book a Court"}</h2>

      <Row className="mb-3">
        <Col md={6}>
          <Form.Group controlId="bookingDate">
            <Form.Label>Select a Booking Date</Form.Label>
            <DatePickerPage
              selectedDate={watch("booking_date")}
              onDateChange={(bookingDate) =>
                setValue("booking_date", bookingDate)
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
                  selectedStartTimeId={watch("start_time_id")}
                  selectedEndTimeId={watch("end_time_id")}
                  onStartTimeSelect={(startTimeId) =>
                    setValue("start_time_id", startTimeId)
                  }
                  onEndTimeSelect={(endTimeId) =>
                    setValue("end_time_id", endTimeId)
                  }
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
              selectedBookingTypeId={watch("booking_type_id")}
              onBookingTypeSelect={(bookingTypeId) =>
                setValue("booking_type_id", bookingTypeId)
              }
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="courtId">
            <Form.Label>Select Court</Form.Label>
            <CourtsPage
              courts={courts}
              selectedCourtId={watch("court_id")}
              onCourtSelect={(courtId) => setValue("court_id", courtId)}
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
