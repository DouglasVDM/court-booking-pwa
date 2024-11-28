import React, { useState } from "react";
import { Col, Form, FormGroup, Row } from "react-bootstrap";

interface DatePickerProps {
  selectedDate: string;
  onDateChange: (date: string) => void;
}

const DatePicker: React.FC<DatePickerProps> = () => {
  const [selectedDate, setSelectedDate] = useState("");

  const handleChange = (event) => {
    const chosenDate = event.target.value;
    setSelectedDate(chosenDate);
  };

  return (
    <>
<h1>Date</h1>
    </>
  );
};

export default DatePicker;
