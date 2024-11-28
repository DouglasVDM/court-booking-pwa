import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";

const CourtsPage = ({ courts }) => {
  const [selectedCourt, setSelectedCourt] = useState(null);
  const [isFinalized, setIsFinalized] = useState(false);

  const handleClick = (event) => {
    const selectedCourt = courts.find(
      (court) => court.court_id === parseInt(event.target.value)
    );
    setSelectedCourt(selectedCourt);
  };

  const handleFinalize = () => {
    setIsFinalized(true);
  };

  const handleChangeCourt = () => {
    setIsFinalized(false);
    setSelectedCourt(null); // Reset selection to allow re-selection
  };

  return (
    <>
      <Form>
        {" "}
        <Form.Group as={Row} className="mb-3">
          <Form.Label as="legend" column sm={2}>
            <h5>Please select your court</h5>
          </Form.Label>

          {/* Show only the selected court if finalized */}
          {isFinalized && selectedCourt ? (
            <Col sm={15}>
              <Form.Label>
                <strong>Selected Court:</strong> {selectedCourt.court_name}
                {selectedCourt.has_lights && (
                  <span style={{ color: "green", marginLeft: "10px" }}>
                    (Has Lights)
                  </span>
                )}
              </Form.Label>
              <Button
                variant="secondary"
                style={{ marginTop: "10px" }}
                onClick={handleChangeCourt}
              >
                Change Court
              </Button>
            </Col>
          ) : (
            // Show all courts if not finalized
            courts.map(({ court_id, court_name, has_lights }) => (
              <Col key={court_id} sm={15}>
                <Form.Check
                  onClick={handleClick}
                  type="radio"
                  label={
                    <span>
                      {court_name}{" "}
                      {has_lights && (
                        <span style={{ color: "green", marginLeft: "10px" }}>
                          (Has Lights)
                        </span>
                      )}
                    </span>
                  }
                  name="selectedCourt"
                  id={court_id}
                  value={court_id}
                />
              </Col>
            ))
          )}
        </Form.Group>
        {/* Finalize button */}
        {!isFinalized && selectedCourt && (
          <Button
            variant="primary"
            onClick={handleFinalize}
            style={{ marginTop: "10px" }}
          >
            Finalize Selection
          </Button>
        )}
      </Form>
    </>
  );
};

CourtsPage.propTypes = {
  courts: PropTypes.arrayOf(
    PropTypes.shape({
      court_id: PropTypes.number.isRequired,
      court_name: PropTypes.string.isRequired,
    })
  ).isRequired,
  //   onCourtSelected: PropTypes.func.isRequired,
};

export default CourtsPage;
