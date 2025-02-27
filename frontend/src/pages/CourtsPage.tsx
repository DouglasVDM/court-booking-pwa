import React, { useState, useEffect } from "react";
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
  const [selectedCourt, setSelectedCourt] = useState<number | null>(selectedCourtId);

  useEffect(() => {
    setSelectedCourt(selectedCourtId); // Update local state when prop changes
  }, [selectedCourtId]);

  const handleCourtSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const courtId = parseInt(event.target.value, 10) || null;
    setSelectedCourt(courtId);
    onCourtSelect(courtId);
    console.log("Selected Court ID:", courtId);
  };

  return (
    <Form.Select size="lg" value={selectedCourt ?? ""} onChange={handleCourtSelect}>
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
