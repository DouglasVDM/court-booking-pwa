import React from "react";
import { Form } from "react-bootstrap";

interface Court {
  court_id: number; // Use number to match int type
  court_name: string;
}

interface CourtsPageProps {
  courts: Court[];
  onCourtSelect: (id: number) => void; // Callback with int ID
}

const CourtsPage: React.FC<CourtsPageProps> = ({ courts, onCourtSelect }) => {
  const handleCourtChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCourtId = parseInt(event.target.value, 10); // Convert to int
    onCourtSelect(selectedCourtId);
    console.log("selectedCourtId", selectedCourtId);
  };

  return (
    <Form.Group controlId="courtSelect">
      <Form.Select size="lg" onChange={handleCourtChange}>
        <option value="">Court</option>
        {courts.map(({ court_id, court_name }) => (
          <option key={court_id} value={court_id}>
            {court_name}
          </option>
        ))}
      </Form.Select>
    </Form.Group>
  );
};

export default CourtsPage;
