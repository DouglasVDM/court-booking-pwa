import { useState, useEffect } from "react";
import axios from "axios";

const useFetchBookings = (apiEndpointPrefix) => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const fetchBookingResponse = await axios.get(
          `${apiEndpointPrefix}/bookings`
        );
        setBookings(fetchBookingResponse.data);
        console.log(fetchBookingResponse.data);
      } catch (err) {
        console.error("Error fetching bookings:", err.message);
      }
    };
    fetchBookings();
  }, [apiEndpointPrefix]);

  return { bookings, setBookings };
};

export default useFetchBookings;
