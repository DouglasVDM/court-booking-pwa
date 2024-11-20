import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import PropTypes from "prop-types";

const CourtsPage = ({ courts }) => {
  const [selectedCourt, setSelectedCourt] = useState(null);

  const handleClick = (event) => {
    const selectedCourt = courts.find(
      (court) => court.court_id === parseInt(event.target.value)
    );
    setSelectedCourt(selectedCourt);
  };

  return (
    <>
      <Form>
        {" "}
        <Form.Group as={Row} className="mb-3">
          <Form.Label as="legend" column sm={2}>
            Please select your court
          </Form.Label>
          {courts.map(({ court_id, court_name, has_lights }) => (
            <Col key={court_id} sm={15}>
              <Form.Label>
                <p>{has_lights}</p>
              </Form.Label>
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
          ))}
        </Form.Group>
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
