import React from "react";
import CourtsPage from "./CourtsPage";
import BookingTypesPage from "./BookingTypesPage";
import DatePicker from "../components/DatePicker";
import StartTimeSelector from "./TimeSelector";

const BookingPage = ({ courts, bookingTypes, startTimes, endTimes }) => {
  return (
    <>
      <h1>Booking Page</h1>
      <CourtsPage courts={courts} />
      <BookingTypesPage bookingTypes={bookingTypes} />
      <DatePicker />
      <StartTimeSelector startTimes={startTimes} endTimes={endTimes} />
    </>
  );
};

export default BookingPage;
