import React, { useState } from "react";
import Form from "react-bootstrap/Form";

interface StartTime {
  start_time: string;
  end_time: string;
}

const TimeSelector = ({ startTimes, endTimes }) => {
  const [selectedStartTime, setSelectedStartTime] = useState([]);
  const [selectedEndTime, setSelectedEndTime] = useState([]);

  const handleSelectedStartTime = (event) => {
    const selectedStartTimeSlot = event.target.value;
    setSelectedStartTime(selectedStartTimeSlot);
    console.log("start_time",selectedStartTimeSlot);
  };

  const handleSelectedEndTime = (event) => {
    const selectedEndTimeSlot = event.target.value;
    setSelectedEndTime(selectedEndTimeSlot);
    console.log("end_time",selectedEndTimeSlot);
  };

  // onClick={handleSelectedStartTime(selectedStartTime)}

  return (
    <>
      <Form.Group>
        <Form.Label>Select a start time</Form.Label>
        <Form.Select size="lg" onChange={handleSelectedStartTime}>
          <option aria-label="select a start time">Select a start time</option>
          {startTimes.map(({ start_time_id, start_time }) => (
            <option key={start_time_id} value={start_time}>
              {start_time}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      <Form.Group>
        <Form.Label>Select a end time</Form.Label>
        <Form.Select size="lg" onChange={handleSelectedEndTime}>
          <option aria-label="select a end time">Select a end time</option>
          {endTimes.map(({ end_time_id, end_time }) => (
            <option key={end_time_id} value={end_time}>
              {end_time}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
    </>
  );
};

export default TimeSelector;
