import React from "react";
import CourtsPage from "./CourtsPage";
import BookingTypesPage from "./BookingTypesPage";
import DatePickerPage from "../components/DatePickerPage";
import StartTimeSelector from "./TimeSelector";

const apiEndpointPrefix = import.meta.env.VITE_API_ENDPOINT;

// Custom Hooks for fetching data
import useCourts from "../customHooks/useCourts";
import useBookingTypes from "../customHooks/useBookingTypes";
import useStartTimes from "../customHooks/useStartTimes";
import useEndTimes from "../customHooks/useEndTimes";

const BookingPage = () => {
  const { courts } = useCourts(apiEndpointPrefix);
  const { bookingTypes } = useBookingTypes(apiEndpointPrefix);
  const { startTimes } = useStartTimes(apiEndpointPrefix);
  const { endTimes } = useEndTimes(apiEndpointPrefix);

  return (
    <>
      <h1>Booking Page</h1>
      <DatePickerPage />
      <CourtsPage courts={courts} />
      <BookingTypesPage bookingTypes={bookingTypes} />
      <StartTimeSelector startTimes={startTimes} endTimes={endTimes} />
    </>
  );
};

export default BookingPage;
