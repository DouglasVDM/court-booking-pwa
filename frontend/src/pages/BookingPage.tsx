import React, { useState } from "react";
import { Button } from "react-bootstrap";
import BookingsList from "./BookingList";
import BookingForm from "./BookingForm";

const apiEndpointPrefix = import.meta.env.VITE_API_ENDPOINT;

// Custom Hooks for fetching data
import useFetchBookings from "../customHooks/useFetchBookings";

const BookingPage = () => {
  const [currentPage, setCurrentPage] = useState("bookings");
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
            <BookingForm />
          </div>
        )}
      </div>
    </>
  );
};

export default BookingPage;
