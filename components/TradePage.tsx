"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { usePlaceOrder } from "@/hooks/usePlaceOrder";
import { useQueryClient } from "@tanstack/react-query";
import { useSearchTicker } from "@/hooks/useSearchTape";
import { useDebounce } from "@/hooks/useDebounce";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { useTickerInfo } from "@/hooks/useTickerInfo";

export default function TradePage() {
  const [inputValue, setInputValue] = useState<string>("");
  const [ticker, setTicker] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [action, setAction] = useState<"buy" | "sell">("buy");
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const debouncedSearchTerm = useDebounce(inputValue, 300);

  const { data: searchData, isLoading: isSearchLoading } =
    useSearchTicker(debouncedSearchTerm);
  const { data: tickerData, isLoading: isTickerLoading } =
    useTickerInfo(ticker);

  const queryClient = useQueryClient();
  const router = useRouter();

  const {
    mutate: placeOrder,
    isError: isPlaceOrderError,
    error: placeOrderError,
    isSuccess,
  } = usePlaceOrder();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase();
    setInputValue(value);
    setShowDropdown(true);
    setTicker(""); // Clear the ticker when input changes
  };

  const handleTickerSelect = (selectedTicker: string) => {
    setTicker(selectedTicker);
    setInputValue(selectedTicker);
    setShowDropdown(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!ticker) {
      toast.error("Please select a ticker");
      return;
    }

    if (quantity < 1) {
      toast.error("Quantity must be at least 1");
      return;
    }

    if (
      !tickerData ||
      tickerData.currentPrice === undefined ||
      tickerData.currentPrice === null
    ) {
      toast.error("Unable to fetch current price");
      return;
    }

    const orderData = {
      ticker,
      quantity,
      action,
      price: tickerData.currentPrice,
    };

    placeOrder(orderData);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Order placed successfully!");
      queryClient.invalidateQueries({ queryKey: ["portfolio"] });
      setQuantity(1);
      setTicker("");
      setInputValue("");
    }
  }, [isSuccess, queryClient]);

  useEffect(() => {
    if (isPlaceOrderError) {
      toast.error((placeOrderError as Error).message);
    }
  }, [isPlaceOrderError, placeOrderError]);

  return (
    <div className="w-full p-4">
      <h2 className="text-2xl font-bold mb-6">Trade Stocks</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <Label htmlFor="ticker-search">Search Ticker</Label>
          <Input
            id="ticker-search"
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onFocus={() => setShowDropdown(true)}
            onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
            placeholder="Type to search..."
            autoComplete="off"
          />

          {showDropdown && searchData && searchData.length > 0 && (
            <ul className="absolute z-10 bg-zinc-800 border border-zinc-700 w-full max-h-60 overflow-y-auto">
              {searchData.map((option: any) => (
                <li
                  key={option.symbol}
                  className={`p-2 hover:bg-zinc-700 text-white cursor-pointer ${
                    option.symbol === ticker ? "bg-zinc-700" : ""
                  }`}
                  onClick={() => handleTickerSelect(option.symbol)}
                >
                  {option.symbol} {option.name ? `- ${option.name}` : ""}
                </li>
              ))}
            </ul>
          )}

          {showDropdown &&
            debouncedSearchTerm &&
            searchData &&
            searchData.length === 0 &&
            !isSearchLoading && (
              <ul className="absolute z-10 bg-zinc-800 border border-zinc-700 w-full max-h-60 overflow-y-auto">
                <li className="p-2 text-white">No tickers found.</li>
              </ul>
            )}

          {isSearchLoading && (
            <div className="absolute right-2 top-10 text-white">Loading...</div>
          )}
        </div>

        {ticker && (
          <div>
            <Label htmlFor="current-price">Current Price</Label>
            {isTickerLoading ? (
              <div className="text-gray-500">Loading current price...</div>
            ) : tickerData && tickerData.currentPrice !== undefined ? (
              <Input
                id="current-price"
                type="text"
                value={`$${tickerData.currentPrice.toFixed(2)}`}
                disabled
              />
            ) : (
              <div className="text-red-500">Unable to fetch current price.</div>
            )}
          </div>
        )}

        <div>
          <Label htmlFor="quantity">Quantity</Label>
          <Input
            id="quantity"
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
          />
        </div>

        <div className="space-y-4">
          <Label>Action</Label>
          <RadioGroup
            value={action}
            onValueChange={(value: string) =>
              setAction(value as "buy" | "sell")
            }
            className="flex flex-col space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="buy" id="buy" />
              <Label htmlFor="buy">Buy</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="sell" id="sell" />
              <Label htmlFor="sell">Sell</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="flex justify-center">
          <Button
            type="submit"
            className="w-1/2"
            disabled={isSearchLoading || isTickerLoading}
          >
            Place Order
          </Button>
        </div>
      </form>
    </div>
  );
}
