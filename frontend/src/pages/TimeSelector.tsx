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
  selectedStartTimeId: number | null; // Selected start time
  selectedEndTimeId: number | null; // Selected end time
  onStartTimeSelect: (id: number) => void; // Callback for int ID
  onEndTimeSelect: (id: number) => void; // Callback for int ID
}

const TimeSelector: React.FC<TimeSelectorProps> = ({
  startTimes,
  endTimes,
  selectedStartTimeId,
  selectedEndTimeId,
  onStartTimeSelect,
  onEndTimeSelect,
}) => {
  const handleSelectedStartTime = (event) => {
    const selectedStartTimeId = parseInt(event.target.value, 10);
    onStartTimeSelect(selectedStartTimeId);
    console.log("selectedStartTimeId", selectedStartTimeId);
  };

  const handleSelectedEndTime = (event) => {
    const selectedEndTimeId = parseInt(event.target.value, 10);
    onEndTimeSelect(selectedEndTimeId);
    console.log("selectedEndTimeId", selectedEndTimeId);
  };

  return (
    <Row className="mb-3">
      <Form.Group as={Col} controlId="formGridStartTime">
        <Form.Select
          size="lg"
          value={selectedStartTimeId ?? ""}
          onChange={handleSelectedStartTime}
        >
          <option value="" aria-label="Select an start time">
            Start
          </option>
          {startTimes.map(({ start_time_id, start_time }) => (
            <option key={start_time_id} value={start_time_id}>
              {start_time}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group as={Col} controlId="formGridEndTime">
        <Form.Select
          size="lg"
          value={selectedEndTimeId ?? ""}
          onChange={handleSelectedEndTime}
        >
          <option value="" aria-label="Select an end time">
            End
          </option>
          {endTimes.map(({ end_time_id, end_time }) => (
            <option key={end_time_id} value={end_time_id}>
              {end_time}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
    </Row>
  );
};

export default TimeSelector;
