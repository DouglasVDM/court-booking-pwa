import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import heroImage from "../assets/sample.png";

const HeroBanner = () => {
  return (
    <div>
      <Container fluid className="p-0">
        <Row
          className="justify-content-center align-items-center text-light"
          style={{
            minHeight: "100vh",
            backgroundImage: `url(${heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            color: "#fff",
            textShadow: "2px 2px 5px rgba(0, 0, 0, 0.7)",
          }}
        >
          <Col className="text-center">
            <h1>Welcome to the Tennis Club</h1>
            <p>Your court, your time.</p>
            <div className="d-flex justify-content-center gap-3 mt-3">
              <Button variant="success" size="lg">
                Member Login
              </Button>
              <Button variant="outline-dark" size="lg">
                Guest Form
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HeroBanner;
