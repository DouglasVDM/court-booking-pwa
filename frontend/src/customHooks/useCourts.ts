import { useEffect, useState } from 'react';
import axios from 'axios';

const useCourts = (apiEndpointPrefix) => {
  const [courts, setCourts] = useState([]);

  useEffect(() => {
    const fetchCourts = async () => {
      try {
        const courtsResponse = await axios.get(`${apiEndpointPrefix}/courts`);
        setCourts(courtsResponse.data);
        console.log("courtsResponse", courtsResponse.data);
      } catch (err) {
        console.error("Error fetching courts:", err.message);
      }
    };

    fetchCourts();
  }, [apiEndpointPrefix]);

  return { courts, setCourts };
};

export default useCourts;