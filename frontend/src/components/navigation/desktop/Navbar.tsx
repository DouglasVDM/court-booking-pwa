import React from "react";
import { useLocation, Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../../buttons/LoginButton";
import LogoutButton from "../../buttons/LogoutButton";

export function Navbar() {
  const { isAuthenticated } = useAuth0<{
    name: string;
  }>();
  const { pathname } = useLocation(); // Gets the current route

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        {/* Brand Link */}
        <Link
          to="/logo"
          className={`navbar-brand ${pathname === "/" ? "active" : ""}`}
        >
          DTA Tennis Club
        </Link>

        {/* Always Visible Login/Logout Buttons */}
        <div className="d-flex align-items-center">
          {isAuthenticated ? (
            <LogoutButton className="btn-sm btn-outline-secondary ms-2" />
          ) : (
            <LoginButton className="btn-sm btn-outline-primary ms-2" />
          )}
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
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                to="/home"
                className={`nav-link ${pathname === "/home" ? "active" : ""}`}
              >
                Home
              </Link>
            </li>

            {isAuthenticated ? (
              <>
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
