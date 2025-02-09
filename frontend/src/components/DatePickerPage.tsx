import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DatePickerPageProps {
  className?: string;
}

const DatePickerPage: React.FC<DatePickerPageProps> = ({ className }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  return (
    <DatePicker
      selected={selectedDate}
      onChange={handleDateChange}
      className={className}
      dateFormat="yyyy-MM-dd"
      isClearable
    />
  );
};

export default DatePickerPage;
