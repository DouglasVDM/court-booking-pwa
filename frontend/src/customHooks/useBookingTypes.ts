import { useEffect, useState } from "react";
import axios from "axios";

const useBookingTypes = (apiEndpointPrefix) => {
  const [bookingTypes, setBookingTypes] = useState([]);

  useEffect(() => {
    const fetchBookingTypes = async () => {
      try {
        const bookingTypesResponse = await axios.get(
          `${apiEndpointPrefix}/bookingTypes`
        );
        setBookingTypes(bookingTypesResponse.data);
        console.log(bookingTypesResponse.data)
      } catch (err) {
        console.error("Error fetching bookingTypes:", err.message);
      }
    };

    fetchBookingTypes();
  }, [apiEndpointPrefix]);

  return { bookingTypes, setBookingTypes };
};

export default useBookingTypes;
