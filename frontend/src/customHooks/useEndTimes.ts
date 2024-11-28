import { useEffect, useState } from 'react';
import axios from 'axios';

const useEndTimes = (apiEndpointPrefix) => {
  const [endTimes, setEndTimes] = useState([]);

  useEffect(() => {
    const fetchEndTimes = async () => {
      try {
        const endTimesResponse = await axios.get(`${apiEndpointPrefix}/endTimes`);
        setEndTimes(endTimesResponse.data);
        console.log(endTimesResponse.data)
      } catch (err) {
        console.error("Error fetching endTimes:", err.message);
      }
    };

    fetchEndTimes();
  }, [apiEndpointPrefix]);

  return { endTimes, setEndTimes };
};

export default useEndTimes;