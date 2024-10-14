"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { TickerSearch } from "./ui/tickersearch";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./ui/resizable";
import Financials from "./Financials";
import { Card } from "./ui/card";
import { useFinancials } from "@/hooks/useFinancialData";
import StockCard from "./StockCard";
import PerformanceChart from "./PerformanceChart";

const Canvas = ({
  value,
  onSelect,
}: {
  value: string;
  onSelect: (value: string) => void;
}) => {
  const [symbol, setSymbol] = useState(value || "NVDA"); // Initialize state with the provided value or default to "NVDA"

  const {
    data: tickerData,
    error: tickerError,
    isLoading: isTickerLoading,
  } = useFinancials(symbol); // Fetch financial data for the selected symbol

  const handleSelect = (value: string) => {
    setSymbol(value); // Update the symbol state
    onSelect(value); // Call the onSelect callback with the new value
  };

  if (isTickerLoading) {
    return (
      <div className="flex items-center justify-center h-full">Loading...</div>
    ); // Show loading state
  }

  if (tickerError) {
    return (
      <div className="flex items-center justify-center h-full">
        Error: {(tickerError as Error).message}
      </div>
    ); // Show error state
  }

  return (
    <main className="flex flex-col items-center justify-center text-white h-full">
      <div className="flex h-28 border w-full items-center p-4 justify-center ">
        <TickerSearch value={symbol} onSelect={handleSelect} />{" "}
        {/* Ticker search input */}
      </div>
      <div className="flex w-full p-4">
        {tickerData && (
          <StockCard
            companyName={tickerData.companyName}
            symbol={tickerData.symbol}
            exchange={tickerData.exchange}
            price={tickerData.currentPrice}
            priceChange={tickerData.currentPrice - tickerData.previousClose}
            percentChange={
              ((tickerData.currentPrice - tickerData.previousClose) /
                tickerData.previousClose) *
              100
            }
            marketStatus={tickerData.marketStatus}
            industry={tickerData.industry}
            eps={tickerData.forwardEps}
            marketCap={tickerData.marketCap.toLocaleString()}
            divYield={tickerData.fiveYearAvgDividendYield || 0.0}
            pe={tickerData.trailingPE}
          /> // Display stock card with ticker data
        )}
      </div>
      <ResizablePanelGroup direction="horizontal" className="h-full">
        <ResizablePanel className="h-full p-4">
          <PerformanceChart
            data={[
              { name: "Current Price", price: tickerData.currentPrice },
              { name: "50 Day Avergage", price: tickerData.fiftyDayAverage },
              {
                name: "200 Day Average",
                price: tickerData.twoHundredDayAverage,
              },
              { name: "52 Week Low", price: tickerData.fiftyTwoWeekLow },
              { name: "52 Week High", price: tickerData.fiftyTwoWeekHigh },
            ]}
          />{" "}
          {/* Display performance chart with ticker data */}
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={45} className="h-full p-4">
          {tickerData && <Financials financialData={tickerData} />}{" "}
          {/* Display financials panel */}
        </ResizablePanel>
      </ResizablePanelGroup>
    </main>
  );
};

export default Canvas;
