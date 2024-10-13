import { useQuery } from "@tanstack/react-query";

const tickerTape = async () => {
  const response = await fetch(`http://127.0.0.1:5000/api/ticker-tape`, {
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
export const useTickerTape = () => {
  return useQuery({
    queryKey: ["tickerTape"],
    queryFn: () => tickerTape(),
    staleTime: 1000 * 60 * 5,
    refetchInterval: 10 * 1000,
    retry: 2,
    refetchOnWindowFocus: true,
  });
};
