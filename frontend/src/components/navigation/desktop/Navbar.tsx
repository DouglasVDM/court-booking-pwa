import React from "react";
import { useLocation, Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../../buttons/LoginButton";
import LogoutButton from "../../buttons/LogoutButton";

export function Navbar() {
  const { isAuthenticated } = useAuth0<{
    name: string;
  }>();
  const { pathname } = useLocation();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        {/* Brand Link */}
        <Link to="/" className="navbar-brand">
          Tennis Club
        </Link>

        {/* Always visible login/logout buttons */}
        <div className="d-flex">
          {isAuthenticated ? <LogoutButton /> : <LoginButton />}
        </div>

        {/* Navbar Toggler for Mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible Content */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {isAuthenticated ? (
              <>
                <li className="nav-item">
                  <Link
                    to="/"
                    className={`nav-link ${
                      pathname === "/home" ? "active" : ""
                    }`}
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/bookings"
                    className={`nav-link ${
                      pathname === "/bookings" ? "active" : ""
                    }`}
                  >
                    Bookings
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/dashboard"
                    className={`nav-link ${
                      pathname === "/dashboard" ? "active" : ""
                    }`}
                  >
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/profile"
                    className={`nav-link ${
                      pathname === "/profile" ? "active" : ""
                    }`}
                  >
                    Profile
                  </Link>
                </li>
              </>
            ) : null}
          </ul>
        </div>
      </div>
    </nav>
  );
}
