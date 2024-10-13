"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { usePortfolio } from "@/hooks/usePortfolio";

export default function StockPortfolioList() {
  // **Hook is now inside the component**
  const { data, error, isLoading, isError } = usePortfolio();

  const [expandedStocks, setExpandedStocks] = useState<string[]>([]);

  const toggleExpand = (stockTicker: string) => {
    setExpandedStocks((prev) =>
      prev.includes(stockTicker)
        ? prev.filter((id) => id !== stockTicker)
        : [...prev, stockTicker]
    );
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  const calculateTotalValue = (shares: number, currentPrice: number) => {
    return formatCurrency(shares * currentPrice);
  };

  const calculateProfitLoss = (
    shares: number,
    averagePrice: number,
    currentPrice: number
  ) => {
    const profitLoss = shares * (currentPrice - averagePrice);
    const profitLossPercentage =
      ((currentPrice - averagePrice) / averagePrice) * 100;
    return `${formatCurrency(profitLoss)} (${profitLossPercentage.toFixed(
      2
    )}%)`;
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Stock Portfolio</h1>
        <p>Loading...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Stock Portfolio</h1>
        <p>Error: {error.message}</p>
      </div>
    );
  }

  const { portfolio, cash_balance, squared_off_postions } = data;

  return (
    <div className="container mx-auto p-4 ">
      {cash_balance !== undefined && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Cash Balance</h2>
          <p className="text-lg">{formatCurrency(cash_balance)}</p>
        </div>
      )}
      <h1 className="text-2xl font-bold mb-6">Holdings</h1>
      <div className="space-y-4">
        {portfolio.map((stock: any) => (
          <Card
            key={stock.ticker}
            className="w-full bg-transparent shadow-black"
          >
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>{stock.ticker}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleExpand(stock.ticker)}
                  aria-expanded={expandedStocks.includes(stock.ticker)}
                  aria-label={
                    expandedStocks.includes(stock.ticker)
                      ? "Collapse"
                      : "Expand"
                  }
                >
                  {expandedStocks.includes(stock.ticker) ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </CardTitle>
              {/* Remove or handle stock.name appropriately */}
              {/* <CardDescription>{stock.name}</CardDescription> */}
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-5">
                <div>
                  <p className="text-sm text-muted-foreground">Shares</p>
                  <p className="font-medium">{stock.shares}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Avg Price</p>
                  <p className="font-medium">
                    {formatCurrency(stock.average_price)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Current Price</p>
                  <p className="font-medium">
                    {formatCurrency(stock.current_price)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Value</p>
                  <p className="font-medium">
                    {calculateTotalValue(stock.shares, stock.current_price)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Profit/Loss</p>
                  <p className="font-medium">
                    {calculateProfitLoss(
                      stock.shares,
                      stock.average_price,
                      stock.current_price
                    )}
                  </p>
                </div>
              </div>
              {expandedStocks.includes(stock.ticker) && (
                <div className="mt-4">
                  <h3 className="font-semibold mb-2">Transaction History</h3>
                  <ScrollArea className="h-[200px] w-full rounded-md border p-4">
                    <table className="w-full">
                      <thead>
                        <tr>
                          <th className="text-left">Date</th>
                          <th className="text-left">Type</th>
                          <th className="text-right">Shares</th>
                          <th className="text-right">Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {stock.transactions.map((transaction: any) => (
                          <tr key={transaction.id}>
                            <td>
                              {new Date(
                                transaction.timestamp
                              ).toLocaleDateString()}
                            </td>
                            <td>{transaction.transaction_type}</td>
                            <td className="text-right">
                              {transaction.quantity}
                            </td>
                            <td className="text-right">
                              {formatCurrency(transaction.price)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </ScrollArea>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
