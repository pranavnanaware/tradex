import { useQuery } from "@tanstack/react-query";

// Utility function to fetch portfolio data
const fetchPortfolio = async () => {
  const token = localStorage.getItem("access_token"); // Adjust based on where you store your token

  const response = await fetch(`http://127.0.0.1:5000/api/portfolio`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to fetch portfolio");
  }

  const data = await response.json();
  return data;
};

// Custom hook using React Query
export const usePortfolio = () => {
  return useQuery({
    queryKey: ["portfolio"],
    queryFn: fetchPortfolio,
    staleTime: 1000 * 60 * 5,
    retry: 2,
    refetchInterval: 15 * 1000,
    refetchOnWindowFocus: true,
  });
};
