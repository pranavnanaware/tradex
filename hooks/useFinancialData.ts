import { useQuery } from "@tanstack/react-query";

// Utility function to fetch portfolio data
const fetchFinancials = async ({ ticker }: { ticker: string }) => {
  const response = await fetch(
    `http://127.0.0.1:5000/api/ticker?ticker=${ticker}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to fetch portfolio");
  }

  const data = await response.json();
  return data;
};

// Custom hook using React Query
export const useFinancials = (ticker: string) => {
  return useQuery({
    queryKey: ["financials", ticker],
    queryFn: () => fetchFinancials({ ticker }),
    staleTime: 1000 * 60 * 5,
    refetchInterval: 10 * 1000,
    retry: 2,
    refetchOnWindowFocus: true,
  });
};
