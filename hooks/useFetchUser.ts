import { useQuery } from "@tanstack/react-query";

// Utility function to fetch user data
const fetchUser = async () => {
  const response = await fetch(`http://127.0.0.1:5000/api/user`, {
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to fetch user");
  }

  const data = await response.json();
  return data;
};

// Custom hook using React Query
export const useFetchUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchInterval: 10 * 1000, // 10 seconds
    retry: 2,
    refetchOnWindowFocus: true,
  });
};
