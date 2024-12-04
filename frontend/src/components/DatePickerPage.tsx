import React, { useState } from "react";
import { FormGroup } from "react-bootstrap";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { Form } from "react-router-dom";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';
interface DatePickerProps {
  selectedDate: string;
  onDateChange: (date: string) => void;
}

const handleChange = (event) => {
  const chosenDate = event.target.value;
  setSelectedDate(chosenDate);
};

const DatePickerPage = () => {
  // const [selectedDate, setSelectedDate] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  return (
    <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
  );
};

export default DatePickerPage;
