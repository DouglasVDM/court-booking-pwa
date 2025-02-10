import React from "react";
import Form from "react-bootstrap/Form";

interface Court {
  court_id: number;
  court_name: string;
}

interface CourtsPageProps {
  courts: Court[];
  selectedCourtId: number | null;
  onCourtSelect: (id: number) => void;
}

const CourtsPage: React.FC<CourtsPageProps> = ({
  courts,
  selectedCourtId,
  onCourtSelect,
}) => {
  const handleCourtSelect = (event) => {
    const selectedCourtId = parseInt(event.target.value, 10);
    onCourtSelect(selectedCourtId);
    console.log("selectedCourtId", selectedCourtId);
  };

  return (
    <Form.Select
      size="lg"
      value={selectedCourtId ?? ""}
      onChange={handleCourtSelect}
    >
      <option value="" aria-label="Select a court">
        Select Court
      </option>
      {courts.map(({ court_id, court_name }) => (
        <option key={court_id} value={court_id}>
          {court_name}
        </option>
      ))}
    </Form.Select>
  );
};

export default CourtsPage;
