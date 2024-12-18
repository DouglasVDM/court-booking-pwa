import { useAuth0 } from "@auth0/auth0-react";
import NavbarTab from "./NavbarTab";
import { Tab, Tabs } from "react-bootstrap";

const NavbarTabs = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <div className="m-4">
      {isAuthenticated && (
        <header>
          <br />
          {window.location.pathname === "/" ? (
            <>
              <NavbarTab path="/profile" label="Your Profile" />
              <br />
              <NavbarTab path="/bookings" label="Book a court" />
            </>
          ) : (
            <>
              {window.location.pathname === "/bookings-form" ? (
                <>
                  <NavbarTab path="/" label="Home" />
                  <br />
                  <NavbarTab path="/bookings" label="All bookings" />
                </>
              ) : (
                <>
                  <NavbarTab path="/" label="Home" />
                  <br />
                  <NavbarTab path="/booking-form" label="Book a court" />
                </>
              )}
            </>
          )}
        </header>
      )}
    </div>
  );
};

export default NavbarTabs;