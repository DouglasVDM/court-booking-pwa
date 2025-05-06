import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import heroImage from "../assets/saturday-club-social.jpg";

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
      <span className="visually-hidden">
        Background image shows Saturday club members enjoying a sunny match.
      </span>

      <Container className="text-center">
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
