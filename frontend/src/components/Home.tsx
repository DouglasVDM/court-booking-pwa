import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Profile from "./Profile";
import LoginButton from "./LoginButton";

function Home() {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }
  return isAuthenticated ? <Profile /> : <LoginButton />;
}

export default Home;
