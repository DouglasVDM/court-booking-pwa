import { Outlet } from "react-router-dom";
import useFetchMemberId from "../customHooks/useFetchMemberId";
import Unauthorized from "../pages/Unauthorized";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";

const apiPrefix = import.meta.env.VITE_API_ENDPOINT_PREFIX;

const ProtectedLayout = () => {
  const { memberId, loading, error } = useFetchMemberId(apiPrefix);
  const [secondsLeft, setSecondsLeft] = useState(50);

  useEffect(() => {
    if (!loading) return;

    const interval = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    const timeOut = setTimeout(() => {
      window.location.reload();
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeOut);
    };
  }, [loading]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-100">
        <div className="max-w-md bg-white shadow-lg rounded-xl p-8 text-center">
          <Spinner
            animation="border"
            role="status"
            variant="primary"
            className="mb-6"
            style={{ width: "3rem", height: "3rem" }}
          >
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <h2 className="text-2xl font-bold text-gray-700 mb-2">
            Waking up servers...
          </h2>
          <p className="text-gray-600 mb-4">
            Our free server may take up to{" "}
            <span className="font-semibold">60 seconds</span> to start. Thanks
            for your patience!
          </p>
          {secondsLeft <= 30 && (
            <p className="text-sm text-gray-500">
              Still loading... refreshing in {secondsLeft} second
              {secondsLeft !== 1 ? "s" : ""}.
            </p>
          )}
        </div>
      </div>
    );
  }

  // If there was an error fetching the member ID, show Unauthorized instead of redirecting
  if (!memberId || error) return <Unauthorized />;

  return <Outlet />;
};

export default ProtectedLayout;
