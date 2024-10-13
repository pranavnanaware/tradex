"use client";

import Canvas from "@/components/Canvas";
import SideBar from "@/components/SideBar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import TickerTape from "@/components/TickerTape";

const fetchTickerData = async (symbol: string) => {
  const response = await fetch(
    `https://api.tickertick.com/feed?q=z:${symbol}&n=50`
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();
  return data;
};

export default function Home() {
  const router = useRouter();
  const [symbol, setSymbol] = useState("NVDA");

  const {
    data: tickerData,
    isLoading: isTickerLoading,
    isError: isTickerError,
  } = useQuery({
    queryKey: ["tickerData", symbol],
    queryFn: () => fetchTickerData(symbol),
  });

  // Handle loading state
  if (isTickerLoading) {
    return <div>Loading...</div>;
  }

  // Handle error state for ticker data
  if (isTickerError) {
    return <div>Error loading ticker data.</div>;
  }

  // Render the main content
  return (
    <>
      <TickerTape />
      <ResizablePanelGroup direction="horizontal" className="min-h-screen">
        <ResizablePanel defaultSize={20}>
          <SideBar
            symbol={symbol}
            data={tickerData}
            isLoading={isTickerLoading}
            isError={isTickerError}
          />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel>
          <Canvas value={symbol} onSelect={setSymbol} />
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  );
}
