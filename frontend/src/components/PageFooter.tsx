import { Container, Row, Col } from 'react-bootstrap';

const PageFooter = () => {
      return (
  <footer className="bg-dark text-light py-4">
      <Container>
        <Row>
          <Col md={6}>
            <h5>DTA Enterprises</h5>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam fermentum justo vel aliquet rutrum.</p>
          </Col>
          <Col md={3}>
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="#">Home</a></li>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Services</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </Col>
          <Col md={3}>
            <h5>Contact Us</h5>
            <ul className="list-unstyled">
              <li>123 Street Name, City</li>
              <li>Email: dta.enterprises11@gmail.com</li>
              <li>Phone: +27 73 285 6353</li>
            </ul>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <p className="text-center">© {new Date().getFullYear()} DTA Enterprises. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default PageFooter;