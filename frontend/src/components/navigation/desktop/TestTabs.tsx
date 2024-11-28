import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Tab, Tabs } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

const TestTabs = () => {
  const { isAuthenticated, user } = useAuth0<{
    name: string;
  }>();
  const { pathname } = useLocation();

  return (
    <div>
      <Tabs
        defaultActiveKey="profile"
        id="justify-tab-example"
        className="mb-3"
        justify
      >
        <Tab label="Test" eventKey="home" title="Home">
          Tab content for Home
        </Tab>
        <Tab eventKey="/profile" title="Profile" active>
          <Link
            to="/profile"
            className={`nav-item nav-link${
              pathname === "/profile" ? "active" : ""
            }`}
          >
            Profile
          </Link>
        </Tab>
        <Tab eventKey="longer-tab" title="Loooonger Tab">
          Tab content for Loooonger Tab
        </Tab>
        <Tab eventKey="contact" title="Contact" disabled>
          Tab content for Contact
        </Tab>
      </Tabs>
    </div>
  );
};

export default TestTabs;
