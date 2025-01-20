import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import courtImage from "../assets/sample.png";

const FacilitiesSection:React.FC = () => {
  return (
    <Container className="py-5 text-center">
      <Row>
        <Col>
          <h2>Our Facilities</h2>
          <p>
            Our state-of-the-art hard courts are perfect for competitive and
            casual play. Visit us to experience the difference.
          </p>
          <Image
            src={courtImage}
            alt="Tennis Court"
            fluid
            className="rounded shadow-lg mt-4"
          />
        </Col>
      </Row>
    </Container>
  );
};

export default FacilitiesSection;
