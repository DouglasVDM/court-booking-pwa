import React from "react";
import { Card, Col, Row, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const DashboardPage: React.FC = () => {
  return (
    <div className="container mt-5">
      <h1 className="mb-4">Dashboard</h1>
      <h1 className="mb-4">** This page is still under construction **</h1>
      <Row>
        <Col md={6} lg={4} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>My Bookings</Card.Title>
              <Card.Text>View and manage your court bookings.</Card.Text>
              <Link to="/bookings">
                <Button variant="primary">View Bookings</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} lg={4} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Profile</Card.Title>
              <Card.Text>
                Update your profile details and preferences.
              </Card.Text>
              <Link to="/profile">
                <Button variant="secondary">Edit Profile</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} lg={4} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Club News</Card.Title>
              <Card.Text>
                Stay updated with the latest news and events.
              </Card.Text>
              <Link to="/news">
                <Button variant="success">Read News</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardPage;
