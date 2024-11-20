import React from "react";
import { Container, Row, Col } from "react-bootstrap";

// Import your hero image
import heroImage from "../assets/sample.png";

const HeroBanner = () => {
  return (
    <div>
      {/* Hero image */}
      <Container fluid className="p-0">
        <Row
          className="justify-content-center align-items-center"
          style={{
            minHeight: "100vh",
            backgroundImage: `url(${heroImage}`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <Col className="text-center">
            <h1>Welcome to my tennis court booking app</h1>
            <p>Explore and book your favorite court!</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HeroBanner;