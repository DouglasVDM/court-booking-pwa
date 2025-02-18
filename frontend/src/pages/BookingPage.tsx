import React, { useState } from "react";
import { Button } from "react-bootstrap";
import BookingsList from "./BookingList";
import BookingForm from "./BookingForm";

const apiEndpointPrefix = import.meta.env.VITE_API_ENDPOINT_PREFIX;

// Custom Hooks for fetching data
import useFetchBookings from "../customHooks/useBookings";
import useFetchMemberId from "../customHooks/useFetchMemberId";


const BookingPage = () => {
  const [currentPage, setCurrentPage] = useState("bookings");
  const { bookings } = useFetchBookings(apiEndpointPrefix);
  
  const {
    memberId,
    loading: memberLoading,
    error: memberError,
  } = useFetchMemberId(apiEndpointPrefix);
  console.log("memberId", memberId);

  return (
    <div className="bookings-page-container">
      <h1 className="mt-4">Booking Page</h1>
      <div className="mb-3">
        {currentPage !== "bookings" && (
          <Button
            className={`btn ${
              currentPage === "bookings" ? "primary" : "outline-primary"
            }`}
            onClick={() => setCurrentPage("bookings")}
          >
            Show Bookings
          </Button>
        )}
        {currentPage !== "bookingForm" && (
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
        {currentPage === "bookings" && (
          <BookingsList
            bookings={bookings}
            apiEndpointPrefix={apiEndpointPrefix}
            currentMemberId={memberId}
            loading={memberLoading}
            error={memberError}
          />
        )}
        {currentPage === "bookingForm" && (
          <div>
            <BookingForm />
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingPage;
