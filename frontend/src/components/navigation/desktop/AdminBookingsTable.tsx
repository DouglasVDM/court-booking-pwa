import React from "react";

const AdminBookingsTable = ({ bookings }) => {
  return (
    <table className="table table-hover table-bordered">
      <thead className="table-dark">
        <tr>
          <th>ID</th>
          <th>Date</th>
          <th>Court</th>
          <th>Type</th>
          <th>Member</th>
          <th>Participants</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {bookings.map((booking) => (
          <tr key={booking.id}>
            <td>{booking.id}</td>
            <td>{booking.booking_date}</td>
            <td>{booking.court_number}</td>
            <td>{booking.booking_type}</td>
            <td>{booking.member_name}</td>
            <td>{booking.participants.map((p) => p.name).join(", ")}</td>
            <td>
              <button className="btn btn-primary btn-sm me-1">View</button>
              <button className="btn btn-warning btn-sm me-1">Edit</button>
              <button className="btn btn-danger btn-sm">Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AdminBookingsTable;
