import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";

// Custom Hooks for fetching data
import useCourts from "./customHooks/useCourts";

const apiEndpointPrefix = import.meta.env.VITE_API_ENDPOINT;

// Components
import NotFoundPage from "./pages/NotFoundPage";
import PageLoader from "./components/PageLoader";
import Profile from "./pages/Profile";
import CourtsPage from "./pages/CourtsPage";
import HomePage from "./pages/HomePage";
import PageLayout from "./components/PageLayout";

function App() {
  const { error, isLoading } = useAuth0();
  const { courts } = useCourts(apiEndpointPrefix);
  const ProtectedProfile = withAuthenticationRequired(Profile);
  const ProtectedCourt = withAuthenticationRequired(CourtsPage);

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
          <Route path="/profile" element={<ProtectedProfile />} />
          <Route path="/courts" element={<ProtectedCourt courts={courts} />} />
        </Routes>
      </PageLayout>
    </>
  );
}
export default App;
