import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

const apiEndpointPrefix = import.meta.env.VITE_API_ENDPOINT_PREFIX;

const useFetchMemberId = (apiEndpointPrefix) => {
  const { user } = useAuth0();
  const email = user?.email;
  const [memberId, setMemberId] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!email) {
      setError("Email is required");
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
      } finally {
        setLoading(false);
      }
    };

    fetchMemberId();
  }, [email]);

  return { memberId, loading, error };
};

export default useFetchMemberId;
