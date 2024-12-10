import React, { useState } from "react";
import { Button } from "react-bootstrap";
import CourtsPage from "./CourtsPage";
import BookingTypesPage from "./BookingTypesPage";
import DatePickerPage from "../components/DatePickerPage";
import StartTimeSelector from "./TimeSelector";
import BookingsList from "./BookingList";

const apiEndpointPrefix = import.meta.env.VITE_API_ENDPOINT;

// Custom Hooks for fetching data
import useCourts from "../customHooks/useCourts";
import useBookingTypes from "../customHooks/useBookingTypes";
import useStartTimes from "../customHooks/useStartTimes";
import useEndTimes from "../customHooks/useEndTimes";
import useFetchBookings from "../customHooks/useFetchBookings";

const BookingPage = () => {
  const [currentPage, setCurrentPage] = useState("bookings");

  const { courts } = useCourts(apiEndpointPrefix);
  const { bookingTypes } = useBookingTypes(apiEndpointPrefix);
  const { startTimes } = useStartTimes(apiEndpointPrefix);
  const { endTimes } = useEndTimes(apiEndpointPrefix);
  const { bookings } = useFetchBookings(apiEndpointPrefix);

  return (
    <>
      <h1>Booking Page</h1>
      <div className="mb-3">
        {currentPage != "bookings" && (
          <Button
            className={`btn ${
              currentPage === "bookings" ? "primary" : "outline-primary"
            }`}
            onClick={() => setCurrentPage("bookings")}
          >
            Show Bookings
          </Button>
        )}
        {currentPage != "bookingForm" && (
          <Button
            className={`btn ${
              currentPage === "datePicker" ? "primary" : "outline-primary"
            }`}
            onClick={() => setCurrentPage("bookingForm")}
          >
            Book a court
          </Button>
        )}
      </div>
      <div className="mt-4">
        {currentPage === "bookings" && <BookingsList bookings={bookings} />}
        {currentPage === "bookingForm" && (
          <div>
            <h2>Book a Court</h2>
            <DatePickerPage />
            <CourtsPage courts={courts} />
            <BookingTypesPage bookingTypes={bookingTypes} />
            <StartTimeSelector startTimes={startTimes} endTimes={endTimes} />
          </div>
        )}
      </div>
    </>
  );
};

export default BookingPage;
