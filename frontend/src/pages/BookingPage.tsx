import React from "react";
import CourtsPage from "./CourtsPage";
import BookingTypesPage from "./BookingTypesPage";
import DatePicker from "../components/DatePicker";
import TimeSlotSelector from "./TimeSlotSelector";

const BookingPage = ({ courts, bookingTypes, timeSlots }) => {
  return (
    <>
      <h1>Booking Page</h1>
      <CourtsPage courts={courts} />
      <BookingTypesPage bookingTypes={bookingTypes} />
      <DatePicker />
      <TimeSlotSelector timeSlots={timeSlots} />
    </>
  );
};

export default BookingPage;
