import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

export function Navbar() {
  const { isAuthenticated, user, loginWithRedirect, logout } = useAuth0<{
    name: string;
  }>();
  const { pathname } = useLocation();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="collapse navbar-collapse">
        <div className="navbar-nav">
          <Link
            to="/"
            className={`nav-item nav-link${pathname === '/home' ? ' active' : ''}`}
          >
            Home
          </Link>
          <Link
            to="/profile"
            className={`nav-item nav-link${
              pathname === '/profile' ? ' active' : ''
            }`}
          >
            Profile
          </Link>
        </div>
      </div>

      {isAuthenticated ? (
        <div>
          <span id="hello">Hello, {user?.name}!</span>{' '}
          <button
            className="btn btn-outline-secondary"
            id="logout"
            onClick={() =>
              logout({ logoutParams: { returnTo: window.location.origin } })
            }
          >
            logout
          </button>
        </div>
      ) : (
        <button
          className="btn btn-outline-success"
          id="login"
          onClick={() => loginWithRedirect()}
        >
          login
        </button>
      )}
    </nav>
  );
}