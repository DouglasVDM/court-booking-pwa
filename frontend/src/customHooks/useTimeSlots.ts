import { useEffect, useState } from 'react';
import axios from 'axios';

const useTimeSlots = (apiEndpointPrefix) => {
  const [timeSlots, setTimeSlots] = useState([]);

  useEffect(() => {
    const fetchTimeSlots = async () => {
      try {
        const timeSlotsResponse = await axios.get(`${apiEndpointPrefix}/timeslots`);
        setTimeSlots(timeSlotsResponse.data);
        console.log(timeSlotsResponse.data)
      } catch (err) {
        console.error("Error fetching timeSlots:", err.message);
      }
    };

    fetchTimeSlots();
  }, [apiEndpointPrefix]);

  return { timeSlots, setTimeSlots };
};

export default useTimeSlots;