import { useQuery } from "@tanstack/react-query";

// Utility function to fetch portfolio data
const searchTicker = async ({ ticker }: { ticker: string }) => {
  const response = await fetch(
    `http://127.0.0.1:5000/api/search?query=${ticker}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
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
export const useSearchTicker = (ticker: string) => {
  return useQuery({
    queryKey: ["search", ticker],
    queryFn: () => searchTicker({ ticker }),
    staleTime: 1000 * 60 * 5,
    refetchInterval: 10 * 1000,
    retry: 2,
    enabled: !!ticker,
    refetchOnWindowFocus: true,
  });
};
