import React from "react";
import { Route, Routes } from "react-router-dom";
import "./styles/index.css";
import { useAuth0 } from "@auth0/auth0-react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components
import PageLoader from "./components/PageLoader";
import PageLayout from "./components/PageLayout";

// Pages
import BookingPage from "./pages/BookingPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import ProfilePage from "./pages/ProfilePage";
import DashboardPage from "./pages/DashboardPage";
import SignUpPage from "./pages/SignUpPage";
import Unauthorized from "./pages/Unauthorized";
import ProtectedLayout from "./components/ProtectedLayout";

function App() {
  const { error, isLoading } = useAuth0();

  if (isLoading) {
    return <PageLoader />;
  }

  if (error) {
    return <Unauthorized message={error.message} />;
  }

  if (error) {
    return <NotFoundPage message={error.message} />;
  }

  return (
    <PageLayout>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/logo" element={<HomePage />} />
        <Route
          path="/unauthorized"
          element={<Unauthorized message="Unauthorized access" />}
        />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="*" element={<NotFoundPage />} />

        {/* Protected Routes */}
        <Route element={<ProtectedLayout />}>
          <Route path="/bookings" element={<BookingPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </PageLayout>
  );
}

export default App;
