import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

const MembershipSection = () => {
  return (
    <div id="membership-section" className="membership-section bg-light py-5">
      <Container>
        <Row className="text-center">
          <Col>
            <h2>Join the Club</h2>
            <p>
              Become a member of our tennis community and enjoy exclusive access
              to premium courts, events, and more.
            </p>
            {/* Sign-Up button takes users to the sign-up page */}
            <Button
              className="cta-btn"
              onClick={() => {
                window.location.href = "/signup"; // Update as needed
              }}
            >
              Sign Up Now
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MembershipSection;
