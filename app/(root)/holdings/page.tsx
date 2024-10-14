"use client";

import StockPortfolioList from "@/components/Holdings";
import TradePage from "@/components/TradePage";
import { useFinancials } from "@/hooks/useFinancialData";
import { useParams } from "next/navigation";
import React, { use, useEffect } from "react";

const Page = () => {
  const params = useParams();
  const ticker = params.ticker as string; // Ensure ticker is treated as a string
  const { data, error, isLoading, isError } = useFinancials(ticker); // Fetch financial data based on ticker

  return (
    <main className="flex flex-row w-full h-screen">
      <div className="w-1/2 h-full border-r overflow-y-scroll">
        <StockPortfolioList /> {/* Display the stock portfolio list */}
      </div>
      <div className="w-1/2 h-full flex justify-center items-center">
        {data && <TradePage />} {/* Show TradePage only if data is available */}
      </div>
    </main>
  );
};

export default Page;
