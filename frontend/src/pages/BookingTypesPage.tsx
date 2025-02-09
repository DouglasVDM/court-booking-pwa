import React from "react";
import Form from "react-bootstrap/Form";

interface BookingType {
  booking_type_id: number; // Use number to match int type
  booking_type_name: string;
}

interface BookingTypesPageProps {
  bookingTypes: BookingType[];
  selectedBookingTypeId: number | null;
  onBookingTypeSelect: (id: number) => void; // Callback with int ID
}

const BookingTypesPage: React.FC<BookingTypesPageProps> = ({
  bookingTypes,
  selectedBookingTypeId,
  onBookingTypeSelect,
}) => {
  const handleBookingTypeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedBookingTypeId = parseInt(event.target.value, 10);
    onBookingTypeSelect(selectedBookingTypeId);
    console.log("selectedBookingTypeId", selectedBookingTypeId);
  };

  return (
    <Form.Group controlId="bookingTypeSelect">
      <Form.Select
        size="lg"
        value={selectedBookingTypeId ?? ""}
        onChange={handleBookingTypeSelect}
      >
        <option value="" aria-label="Select a booking type">
          Select Booking Type
        </option>
        {bookingTypes.map(({ booking_type_id, booking_type_name }) => (
          <option key={booking_type_id} value={booking_type_id}>
            {booking_type_name}
          </option>
        ))}
      </Form.Select>
    </Form.Group>
  );
};

export default BookingTypesPage;
