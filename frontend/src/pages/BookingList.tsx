import React from "react";

const BookingsList = ({bookings}) => {
console.log(bookings)

  return (
    <div>
      <h3>Bookings</h3>
      <ul>
        {bookings.map((booking) => (
          <li key={booking.booking_id}>
            Court {booking.court_id} - {booking.booking_date} - {booking.start_time_id} to {booking.end_time_id}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookingsList;
