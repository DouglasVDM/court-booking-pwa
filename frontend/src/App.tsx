import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";

const apiEndpointPrefix = import.meta.env.VITE_API_ENDPOINT;

// Custom Hooks for fetching data
import useCourts from "./customHooks/useCourts";
import useBookingTypes from "./customHooks/useBookingTypes";

// Components
import PageLoader from "./components/PageLoader";
import PageLayout from "./components/PageLayout";

// Pages
import BookingPage from "./pages/BookingPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import Profile from "./pages/Profile";
import DashboardPage from "./pages/DashboardPage";
import useStartTimes from "./customHooks/useStartTimes";
import useEndTimes from "./customHooks/useEndTimes";

function App() {
  const { error, isLoading } = useAuth0();
  const { courts } = useCourts(apiEndpointPrefix);
  const { bookingTypes } = useBookingTypes(apiEndpointPrefix);
  const { startTimes } = useStartTimes(apiEndpointPrefix);
  const { endTimes } = useEndTimes(apiEndpointPrefix);
  const ProtectedProfile = withAuthenticationRequired(Profile);
  const ProtectedBooking = withAuthenticationRequired(BookingPage);
  const ProtectedDashboard = withAuthenticationRequired(DashboardPage);

  console.log("endTimes",endTimes);

  if (isLoading) {
    return <PageLoader />;
  }
  return (
    <>
      <PageLayout>
        {" "}
        {error && <NotFoundPage message={error.message} />}
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/dashboard" element={<ProtectedDashboard />} />
          <Route path="/profile" element={<ProtectedProfile />} />
          <Route
            path="/bookings"
            element={
              <ProtectedBooking
                courts={courts}
                bookingTypes={bookingTypes}
                startTimes={startTimes}
                endTimes={endTimes}
              />
            }
          />
        </Routes>
      </PageLayout>
    </>
  );
}
export default App;
