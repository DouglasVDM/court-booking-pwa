import { Outlet } from "react-router-dom";
import useFetchMemberId from "../customHooks/useFetchMemberId";
import Unauthorized from "../pages/Unauthorized";

const apiPrefix = import.meta.env.VITE_API_ENDPOINT_PREFIX;

const ProtectedLayout = () => {
  const { memberId, loading, error } = useFetchMemberId(apiPrefix);

  if (loading) return <div className="p-8 text-center">Checking membership...</div>;

  // If there was an error fetching the member ID, show Unauthorized instead of redirecting
  if (!memberId || error) return <Unauthorized />;

  return <Outlet />;
};

export default ProtectedLayout;
