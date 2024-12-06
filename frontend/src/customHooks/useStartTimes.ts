import { useEffect, useState } from 'react';
import axios from 'axios';

const useStartTimes = (apiEndpointPrefix) => {
  const [startTimes, setStartTimes] = useState([]);

  useEffect(() => {
    const fetchstartTimes = async () => {
      try {
        const startTimesResponse = await axios.get(`${apiEndpointPrefix}/startTimes`);
        setStartTimes(startTimesResponse.data);
      } catch (err) {
        console.error("Error fetching startTimes:", err.message);
      }
    };

    fetchstartTimes();
  }, [apiEndpointPrefix]);

  return { startTimes, setStartTimes };
};

export default useStartTimes;