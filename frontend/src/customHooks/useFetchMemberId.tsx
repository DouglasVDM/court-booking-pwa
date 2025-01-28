import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

const apiEndpointPrefix = import.meta.env.VITE_API_ENDPOINT_PREFIX;

export const useFetchMemberId = () => {
  const { user } = useAuth0(); // Extract email from Auth0 profile
  const [memberId, setMemberId] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMemberId = async () => {
      if (!user?.email) return; // Ensure the email is available
      try {
        setLoading(true);
        const response = await axios.get(`${apiEndpointPrefix}/members/id`, {
          params: { email: user.email },
        });
        setMemberId(response.data.member_id);
      } catch (err) {
        console.error("Error fetching member ID:", err);
        setError("Unable to fetch member ID");
      } finally {
        setLoading(false);
      }
    };

    fetchMemberId();
  }, [user?.email]);

  return { memberId, loading, error };
};
