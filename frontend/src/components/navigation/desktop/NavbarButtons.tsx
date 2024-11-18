import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "../../buttons/LogoutButton";
import LoginButton from "../../buttons/LoginButton";
import SignupButton from "../../buttons/SignupButton";

const NavbarButtons = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <div className="">
      {!isAuthenticated && (
        <>
          <SignupButton />
          <LoginButton />
        </>
      )}
      {isAuthenticated && (
        <>
          <LogoutButton />
        </>
      )}
    </div>
  );
};

export default NavbarButtons;