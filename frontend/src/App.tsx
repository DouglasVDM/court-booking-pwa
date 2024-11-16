import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";

// Custom Hooks for fetching data
import useCourts from "./customHooks/useCourts";

const apiEndpointPrefix = import.meta.env.VITE_API_ENDPOINT;

// Components
import { Navbar } from "./components/pages/Navbar";
import { Error } from "./components/pages/Error";
import { Loading } from "./components/pages/Loading";
import Profile from "./components/pages/Profile";
import LandingPage from "./components/pages/LandingPage";
import CourtsList from "./components/courts/CourtsList"



function App() {
  const { error, isLoading } = useAuth0();
  const { courts } = useCourts(apiEndpointPrefix);
  const ProtectedProfile = withAuthenticationRequired(Profile);
  const ProtectedCourt = withAuthenticationRequired(CourtsList);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <Navbar />
      {error && <Error message={error.message} />}
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/profile" element={<ProtectedProfile />} />
        <Route path="/courts" element={<ProtectedCourt courts={courts} />} />
      </Routes>
    </>
  );
}
export default App;

/**
 *     <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/profile"
        element={<AuthenticationGuard component={ProfilePage} />}
      />
      <Route path="/about" element={<PublicPage />} />
      <Route path="/protected" element={<ProtectedPage/>} />
      <Route
        path="/admin"
        element={<AuthenticationGuard component={AdminPage} />}
      />
      <Route path="/callback" element={<CallbackPage />} />
      <Route path="*" element={<NotFoundPage />} />

      <Route path="/bookings" element={<Bookings bookings={bookings} />} />
      <Route
        path="/booking-form"
        element={
          <BookingForm
            courts={courts}
            daysOfWeek={daysOfWeek}
            startTimes={startTimes}
            durations={durations}
            bookingTypes={bookingTypes}
          />
        }
      />
      <Route path="/login" element={<LoginForm />} />
    </Routes>
 */