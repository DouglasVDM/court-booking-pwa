import React from "react";
import CourtsPage from "./CourtsPage";
import BookingTypesPage from "./BookingTypesPage";

const BookingPage = ({ courts, bookingTypes }) => {
  return (
    <>
    <h1>Booking Page</h1>
      <CourtsPage courts={courts} />
      <BookingTypesPage bookingTypes={bookingTypes} />
    </>
  );
};

export default BookingPage;
