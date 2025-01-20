import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import heroImage from "../assets/sample.png";

const HeroBanner = () => {
  return (
    <div>
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
          <Col className="text-center text-light">
            <h1 className="animate-text">Welcome to Our Tennis Club</h1>
            <p className="animate-text">Explore and book your favorite court!</p>
            {/* Button directs users to the MembershipSection */}
            <Button
              className="cta-btn"
              href="#membership-section"
            >
              Learn More
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HeroBanner;
