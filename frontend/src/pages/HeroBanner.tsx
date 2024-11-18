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
          <Col className="text-center text-light">
            <h1>Welcome to My App</h1>
            <p>Explore and book your favorite courts!</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HeroBanner;