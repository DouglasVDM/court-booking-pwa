import React from "react";
import { Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";

interface Time {
  start_time_id: number;
  start_time: string;
  end_time_id: number;
  end_time: string;
}

interface TimeSelectorProps {
  startTimes: Time[]; // Array of start times
  endTimes: Time[]; // Array of end times
  onStartTimeSelect: (id: number) => void; // Callback for int ID
  onEndTimeSelect: (id: number) => void; // Callback for int ID
}

const TimeSelector: React.FC<TimeSelectorProps> = ({
  startTimes,
  endTimes,
  onStartTimeSelect,
  onEndTimeSelect,
}) => {
  const handleSelectedStartTime = (event) => {
    const selectedStartTimeId = parseInt(event.target.value, 10);
    onStartTimeSelect(selectedStartTimeId);
    console.log("start_time_id", selectedStartTimeId);
  };

  const handleSelectedEndTime = (event) => {
    const selectedEndTimeId = parseInt(event.target.value, 10);
    onEndTimeSelect(selectedEndTimeId);
    console.log("end_time", selectedEndTimeId);
  };

  return (
    <Form>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridStartTime">
          <Form.Label className="text-start w-100">
            Select a start time
          </Form.Label>
          <Form.Select size="lg" onChange={handleSelectedStartTime}>
            <option aria-label="select a start time">
              Select a start time
            </option>
            {startTimes.map(({ start_time_id, start_time }) => (
              <option key={start_time_id} value={start_time_id}>
                {start_time}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group as={Col} controlId="formGridStartTime">
          <Form.Label className="text-start w-100">
            Select a end time
          </Form.Label>
          <Form.Select size="lg" onChange={handleSelectedEndTime}>
            <option aria-label="select a end time">Select a end time</option>
            {endTimes.map(({ end_time_id, end_time }) => (
              <option key={end_time_id} value={end_time_id}>
                {end_time}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      </Row>
    </Form>
  );
};

export default TimeSelector;
