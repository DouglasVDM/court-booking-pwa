import React from "react";
import { Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DatePickerProps {
  selectedDate: Date | null; // Accept Date or null for compatibility
  onDateChange: (date: Date | null) => void; // Callback to pass the selected date
}

const DatePickerPage: React.FC<DatePickerProps> = ({
  selectedDate,
  onDateChange,
}) => {
  const handleSelectedDate = (date: Date | null) => {
    onDateChange(date);
    console.log(date);
  };

  return (
    <Form.Group controlId="datePicker">
      <div className="d-flex">
        <DatePicker
          selected={selectedDate}
          onChange={handleSelectedDate}
          dateFormat="yyyy-MM-dd" // Format the date for readability
          minDate={new Date()} // Disable past dates
          isClearable // Allow clearing the selection
          placeholderText="Date"
          className="form-control"
        />
      </div>
    </Form.Group>
  );
};

export default DatePickerPage;
