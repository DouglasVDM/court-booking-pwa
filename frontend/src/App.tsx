import React from "react";
import { Route, Routes } from "react-router-dom";
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
  const { error, isLoading } = useAuth0();

  const ProtectedProfile = withAuthenticationRequired(Profile);
  const ProtectedBooking = withAuthenticationRequired(BookingPage);
  const ProtectedDashboard = withAuthenticationRequired(DashboardPage);

  if (isLoading) {
    return <PageLoader />;
  } else {
    error && <NotFoundPage message={error.message} />;
  }
  return (
    <>
      <PageLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/bookings" element={<ProtectedBooking />} />
          <Route path="/dashboard" element={<ProtectedDashboard />} />
          <Route path="/profile" element={<ProtectedProfile />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </PageLayout>
    </>
  );
}
export default App;
