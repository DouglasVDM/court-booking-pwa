import React from "react";
import { Form } from "react-bootstrap";

interface DatePickerProps {
  selectedDate: string;
  onDateChange: (date: string) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ selectedDate, onDateChange }) => (
  <Form.Group>
    <Form.Label>Select Date</Form.Label>
    <Form.Control
      type="date"
      value={selectedDate}
      onChange={(event) => onDateChange(event.target.value)}
    />
  </Form.Group>
);

export default DatePicker;