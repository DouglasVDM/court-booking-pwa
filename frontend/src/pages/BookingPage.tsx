import React from "react";
import CourtsPage from "./CourtsPage";
import BookingTypesPage from "./BookingTypesPage";
import DatePicker from "../components/DatePicker"
const BookingPage = ({ courts, bookingTypes }) => {
  return (
    <>
    <h1>Booking Page</h1>
      <CourtsPage courts={courts} />
      <BookingTypesPage bookingTypes={bookingTypes} />
      <DatePicker/>
    </>
  );
};

export default BookingPage;
