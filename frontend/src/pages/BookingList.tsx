import React from "react";

const BookingsList = ({ bookings }) => {
  console.log(bookings);

  return (
    <div>
      <h3>Bookings</h3>
      <ul>
        {bookings.map((booking) => (
          <li key={booking.booking_id}>
            {booking.first_name} {booking.surname}_booked_{booking.court_name}_for_
            {booking.booking_type_name}_on_
            {booking.day_name} {booking.booking_date}_starting at_
            {booking.start_time}_finishing at_{booking.end_time}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookingsList;
