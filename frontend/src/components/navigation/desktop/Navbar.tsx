import React from "react";
import { useLocation, Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../../buttons/LoginButton";
import LogoutButton from "../../buttons/LogoutButton";

export function Navbar() {
  const { isAuthenticated, user } = useAuth0<{
    name: string;
  }>();
  const { pathname } = useLocation();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="">
        {/* <div className="collapse navbar-collapse"> */}
        <div className="navbar-nav"></div>
        {isAuthenticated ? (
          <>
            <Link
              to="/"
              className={`nav-item nav-link${
                pathname === "/home" ? "active" : ""
              }`}
            >
              Home
            </Link>
            <Link
              to="/profile"
              className={`nav-item nav-link${
                pathname === "/profile" ? "active" : ""
              }`}
            >
              Profile
            </Link>
            <Link
              to="/courts"
              className={`nav-item nav-link${
                pathname === "/courts" ? "active" : ""
              }`}
            >
              Courts
              <span id="hello">Hello, {user?.name}!</span>
              <LogoutButton />
            </Link>
          </>
        ) : (
          <>
            <LoginButton />
          </>
        )}
      </div>
    </nav>
  );
}
