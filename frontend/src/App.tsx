import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";

// Components
import PageLoader from "./components/PageLoader";
import PageLayout from "./components/PageLayout";

// Pages
import BookingPage from "./pages/BookingPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import Profile from "./pages/Profile";
import DashboardPage from "./pages/DashboardPage";
import SignUpPage from "./pages/SignUpPage";

function App() {
  const { error, isLoading, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    const currentPath = window.location.pathname;
    if (isAuthenticated && currentPath === "/") {
      navigate("/bookings");
    }
  }, [isAuthenticated, navigate]);

  const ProtectedBooking = withAuthenticationRequired(BookingPage, {
    onRedirecting: () => <PageLoader />,
  });
  const ProtectedDashboard = withAuthenticationRequired(DashboardPage, {
    onRedirecting: () => <PageLoader />,
  });
  const ProtectedProfile = withAuthenticationRequired(Profile, {
    onRedirecting: () => <PageLoader />,
  });

  if (isLoading) {
    return <PageLoader />;
  }

  if (error) {
    return <NotFoundPage message={error.message} />;
  }

  return (
    <PageLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/bookings" element={<ProtectedBooking />} />
        <Route path="/dashboard" element={<ProtectedDashboard />} />
        <Route path="/profile" element={<ProtectedProfile />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </PageLayout>
  );
}

export default App;
