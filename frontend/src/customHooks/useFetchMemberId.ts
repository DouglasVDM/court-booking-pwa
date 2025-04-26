import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const useFetchMemberId = (apiEndpointPrefix) => {
  const { user, logout, isAuthenticated } = useAuth0();
  const email = user?.email;
  const navigate = useNavigate();

  const [memberId, setMemberId] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!email) {
      setError("Email is required");
      setLoading(false);
      return;
    }

    if (!isAuthenticated) {
      setError("User is not authenticated");
      setLoading(false);
      return;
    }

    const fetchMemberId = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `${apiEndpointPrefix}/members/email/${email}`,
          { headers: { Accept: "application/json" } }
        );

        setMemberId(response.data.member_id);
      } catch (err: any) {
        console.error("Error fetching member ID", err);
        setError(err.response?.data || "Failed to fetch member ID");

        // 👇 Log them out if not a valid member
        navigate("/unauthorized");
      } finally {
        setLoading(false);
      }
    };

    fetchMemberId();
  }, [email, isAuthenticated]);

  return { memberId, loading, error };
};

export default useFetchMemberId;
