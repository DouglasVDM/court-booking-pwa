import React, { useState } from "react";
import { Row } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

const CourtsPage = ({ courts }) => {
  const [selectedCourt, setSelectedCourt] = useState([]);

  const handleSelectedCourt = (event) => {
    const court = event.target.value;
    setSelectedCourt(court);
    console.log("court", selectedCourt);
  };

  return (
    <Form>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridBooking">
          <Form.Label className="text-start w-100">Select a court</Form.Label>
          <Form.Select size="lg" onChange={handleSelectedCourt}>
            <option aria-label="select a court">Select a court</option>
            {courts.map(({ court_id, court_name }) => (
              <option key={court_id} value={court_name}>
                {court_name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      </Row>
    </Form>
  );
};

export default CourtsPage;
