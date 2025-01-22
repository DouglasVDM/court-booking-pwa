import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const PageFooter: React.FC = () => {
  return (
    <footer
      style={{
        backgroundColor: "#dee2e6", // 30% darker gray
        color: "#212529", // Bootstrap's standard text color
      }}
      className="py-4 border-top"
    >
      <Container>
        {/* Main Footer Content */}
        <Row>
          <Col md={6} className="mb-3 mb-md-0">
            <h5 className="text-uppercase">DTA Enterprises</h5>
            <p className="small text-muted">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              fermentum justo vel aliquet rutrum.
            </p>
          </Col>
          <Col md={3} className="mb-3 mb-md-0">
            <h5 className="text-uppercase">Quick Links</h5>
            <ul className="list-unstyled small">
              <li>
                <a href="#" className="text-decoration-none text-dark">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-decoration-none text-dark">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-decoration-none text-dark">
                  Services
                </a>
              </li>
              <li>
                <a href="#" className="text-decoration-none text-dark">
                  Contact
                </a>
              </li>
            </ul>
          </Col>
          <Col md={3}>
            <h5 className="text-uppercase">Contact Us</h5>
            <ul className="list-unstyled small">
              <li className="text-muted">123 Street Name, City</li>
              <li>
                Email:{" "}
                <a
                  href="mailto:dta.enterprises11@gmail.com"
                  className="text-decoration-none text-dark"
                >
                  dta.enterprises11@gmail.com
                </a>
              </li>
              <li>
                Phone:{" "}
                <a
                  href="tel:+27732856353"
                  className="text-decoration-none text-dark"
                >
                  +27 73 285 6353
                </a>
              </li>
            </ul>
          </Col>
        </Row>

        {/* Footer Bottom Section */}
        <Row className="mt-4">
          <Col>
            <p className="text-center small text-muted mb-0">
              © {new Date().getFullYear()} DTA Enterprises. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default PageFooter;
