import React, { useState } from "react";
import { Button } from "react-bootstrap";
import BookingsList from "./BookingList";
import BookingForm from "./BookingForm";

// Custom Hooks for fetching data
import useFetchBookings from "../customHooks/useBookings";
import useFetchMemberId from "../customHooks/useFetchMemberId";
import useCreateBooking from "../customHooks/useCreateBooking"; // ✅ Import new hook

const apiEndpointPrefix = import.meta.env.VITE_API_ENDPOINT_PREFIX;

const BookingPage = () => {
  const [currentPage, setCurrentPage] = useState("bookings");
  const [refreshBookings, setRefreshBookings] = useState(0); // ✅ Force re-fetch trigger

  const { bookings } = useFetchBookings(apiEndpointPrefix, refreshBookings); // ✅ Pass refreshBook
  const {
    memberId,
    loading: memberLoading,
    error: memberError,
  } = useFetchMemberId(apiEndpointPrefix);
  console.log("memberId", memberId);
  const { createBooking, loading: bookingLoading } =
    useCreateBooking(apiEndpointPrefix); // ✅ Use custom hook

  const handleCreateBooking = async (data: any) => {
    if (!memberId) {
      console.error("Member ID is missing.");
      return;
    }

    const bookingData = { ...data, member_id: memberId };
    console.log("bookingData", bookingData);

    await createBooking(data, memberId, () => {
      setRefreshBookings((prev) => prev + 1); // ✅ Trigger re-fetch
      setCurrentPage("bookings"); // ✅ Navigate back to bookings list
    });
  };

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
            disabled={bookingLoading}
          >
            {bookingLoading ? "Booking..." : "Book a court"}
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
            <BookingForm
              onSubmit={handleCreateBooking}
              onCancel={() => setCurrentPage("bookings")}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingPage;
