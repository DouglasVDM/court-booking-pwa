import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "./LogoutButton";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate("/");
  }

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2 id="user-name">{user.name}</h2>
        <p>{user.email}</p>
      </div>
    )
  );
};

export default Profile;
