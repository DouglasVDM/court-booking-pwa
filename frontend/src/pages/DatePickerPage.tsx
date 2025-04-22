import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DatePickerPageProps {
  selectedDate: Date | null;
  onDateChange: (date: Date | null) => void;
  className?: string;
}

const DatePickerPage: React.FC<DatePickerPageProps> = ({
  selectedDate,
  onDateChange,
  className,
}) => {
  return (
    <DatePicker
      selected={selectedDate}
      onChange={onDateChange}
      className={className}
      dateFormat="yyyy-MM-dd"
      isClearable
      minDate={new Date()} // disables all dates before today
      placeholderText="Select a date"
      showPopperArrow={true}
      popperPlacement="top"
    />
  );
};

export default DatePickerPage;
