import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import heroImage from "../assets/sample.png";

const HeroBanner = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${heroImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "70vh", // Optimal height for modern hero banners
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container className="text-center text-light">
        <Row>
          <Col>
            <h1 className="fw-bold">Welcome to Our Tennis Club</h1>
            <p className="lead">Explore and book your favorite court today!</p>
            <Button
              className="cta-btn mt-3"
              href="#membership-section"
              size="lg"
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
