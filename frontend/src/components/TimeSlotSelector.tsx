import React from "react";
import { Row, Col, Form } from "react-bootstrap";

interface TimeSlotSelectorProps {
  timeSlot: { start: string; end: string };
  onTimeChange: (field: "start" | "end", value: string) => void;
}

const TimeSlotSelector: React.FC<TimeSlotSelectorProps> = ({ timeSlot, onTimeChange }) => (
  <Row>
    <Col md={3}>
      <Form.Group>
        <Form.Label>Start Time</Form.Label>
        <Form.Control
          type="time"
          value={timeSlot.start}
          onChange={(e) => onTimeChange("start", e.target.value)}
        />
      </Form.Group>
    </Col>
    <Col md={3}>
      <Form.Group>
        <Form.Label>End Time</Form.Label>
        <Form.Control
          type="time"
          value={timeSlot.end}
          onChange={(e) => onTimeChange("end", e.target.value)}
        />
      </Form.Group>
    </Col>
  </Row>
);

export default TimeSlotSelector;