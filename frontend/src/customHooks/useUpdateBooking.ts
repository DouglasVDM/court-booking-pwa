import axios from "axios";

const useUpdateBooking = (apiEndpointPrefix: string) => {
  const updateBooking = async (bookingId: string, updatedBooking: object) => {
    const response = await axios.put(
      `${apiEndpointPrefix}/bookings/${bookingId}`,
      updatedBooking
    );
    return response.data;
  };

  return { updateBooking };
};

export default useUpdateBooking;
