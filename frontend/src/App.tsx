import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Profile from "./components/pages/Profile";
import { Navbar } from "./components/pages/Navbar";
import { Error } from "./components/pages/Error";
import LandingPage from "./components/pages/LandingPage";
import { Loading } from "./components/pages/Loading";

function App() {
  const { error, isLoading } = useAuth0();
  const ProtectedProfile = withAuthenticationRequired(Profile);

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
      </Routes>
    </>
  );
}
export default App;
