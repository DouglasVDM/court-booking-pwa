import React from "react";
import { Card, Col, Row, Button, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

const DashboardPage: React.FC = () => {
  // Example data for upcoming bookings and announcements
  const upcomingBookings = [
    { court: 2, date: "2025-01-25", time: "10:00 AM - 11:00 AM" },
    { court: 1, date: "2025-01-27", time: "3:00 PM - 4:00 PM" },
  ];

  const announcements = [
    "Join our doubles tournament this weekend!",
    "Don't forget to renew your membership before February.",
  ];

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Welcome to Your Dashboard</h1>
      <h1 className="mb-4">** This page is still under construction **</h1>
      <Row>
        {/* Upcoming Bookings */}
        <Col md={6} lg={4} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Upcoming Bookings</Card.Title>
              {upcomingBookings.length > 0 ? (
                <ListGroup>
                  {upcomingBookings.map((booking, index) => (
                    <ListGroup.Item key={index}>
                      Court {booking.court} - {booking.date}, {booking.time}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              ) : (
                <p>No upcoming bookings.</p>
              )}
              <Link to="/bookings">
                <Button variant="primary" className="mt-3">
                  Manage Bookings
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>

        {/* Announcements */}
        <Col md={6} lg={4} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Club Announcements</Card.Title>
              {announcements.length > 0 ? (
                <ListGroup>
                  {announcements.map((announcement, index) => (
                    <ListGroup.Item key={index}>{announcement}</ListGroup.Item>
                  ))}
                </ListGroup>
              ) : (
                <p>No announcements at this time.</p>
              )}
              <Link to="/news">
                <Button variant="success" className="mt-3">
                  View All News
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>

        {/* Profile Management */}
        <Col md={6} lg={4} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>My Profile</Card.Title>
              <Card.Text>
                Update your details and view your membership status.
              </Card.Text>
              <Link to="/profile">
                <Button variant="secondary">Edit Profile</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>

        {/* Optional: Admin Tools */}
        <Col md={6} lg={4} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Admin Tools</Card.Title>
              <Card.Text>Manage courts, users, and club operations.</Card.Text>
              <Link to="/admin">
                <Button variant="warning">Go to Admin Panel</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardPage;
