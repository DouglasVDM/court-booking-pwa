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
import CourtsList from "./components/courts/CourtsList";
import PageFooter from "./components/pages/PageFooter";
import HeroBanner from "./components/pages/HeroBanner";
import PageLayout from "./components/PageLayout";
import HomePage from "./components/pages/HomePage";

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
      <PageLayout>
        {" "}
        {error && <Error message={error.message} />}
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
