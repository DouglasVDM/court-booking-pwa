import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

const MembershipSection = () => {
  return (
    <Container className="py-5 text-center bg-light">
      <Row>
        <Col>
          <h2>Membership Benefits</h2>
          <p>
            Enjoy exclusive access to our courts, priority bookings, and
            members-only events.
          </p>
          <div className="d-flex justify-content-center gap-3 mt-3">
            <Button variant="success" size="lg">
              Member Login
            </Button>
            <Button variant="outline-primary" size="lg">
              Guest Form
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default MembershipSection;
