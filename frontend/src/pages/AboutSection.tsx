import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const AboutSection:React.FC = () => {
  return (
    <Container className="py-5 text-center">
      <Row>
        <Col>
          <h2>About Us</h2>
          <p>
            Welcome to the Tennis Club! We are passionate about providing the
            best facilities for players of all skill levels. Whether you're a
            beginner or a seasoned pro, our courts are ready for you.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutSection;
