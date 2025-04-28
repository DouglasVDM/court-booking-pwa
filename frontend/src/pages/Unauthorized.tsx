import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "../components/buttons/LogoutButton";

const Unauthorized = () => {
  const navigate = useNavigate();
  const timeOut = 5000;
  const { logout } = useAuth0();
  const [secondsLeft, setSecondsLeft] = useState(5);

  useEffect(() => {
    const countdown = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
      if (secondsLeft <= 0) {
        clearInterval(countdown);
        navigate("/");
      }
    }, 1000);

    const autoLogout = setTimeout(() => {
      logout();
    }, timeOut);

    return () => {
      clearInterval(countdown);
      clearTimeout(autoLogout);
    };
  }, [logout]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="max-w-md bg-white shadow-lg rounded-xl p-8 text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Access Denied</h1>
        <p className="text-gray-700 mb-6">
          Sorry, your email is not recognized as a member of the DTA Tennis
          Club.
        </p>
        <p className="text-gray-500 text-sm mb-6">
          Logging out in {secondsLeft} second{secondsLeft !== 1 ? "s" : ""}...
        </p>
        <div className="flex flex-col gap-4">
          <LogoutButton />
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
