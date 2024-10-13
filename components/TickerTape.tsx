"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { useTickerTape } from "@/hooks/useTickerTape";

type TickerItem = {
  symbol: string;
  price: number;
  change: number;
};

export default function TickerTape() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { data, error, isLoading, isError } = useTickerTape();
  const [tickerItems, setTickerItems] = useState<TickerItem[]>([]);

  useEffect(() => {
    if (data) {
      setTickerItems(data);
    }
  }, [data]);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const totalWidth = scrollContainer.scrollWidth;
    const viewportWidth = scrollContainer.offsetWidth;
    let currentPosition = 0;

    const scroll = () => {
      currentPosition += 1;
      if (currentPosition >= totalWidth / 2) {
        currentPosition = 0;
      }
      scrollContainer.scrollLeft = currentPosition;
      requestAnimationFrame(scroll);
    };

    const animationId = requestAnimationFrame(scroll);

    // Simulating live updates
    const intervalId = setInterval(() => {
      setTickerItems((prevItems) =>
        prevItems.map((item) => ({
          ...item,
          price: +(item.price + (Math.random() - 0.5) * 2).toFixed(2),
          change: +(item.change + (Math.random() - 0.5)).toFixed(2),
        }))
      );
    }, 5000);

    return () => {
      cancelAnimationFrame(animationId);
      clearInterval(intervalId);
    };
  }, []);

  const renderTickerItem = (item: TickerItem, index: number) => (
    <div key={index} className="flex items-center mr-8 whitespace-nowrap">
      <span className="font-bold">{item.symbol}</span>
      <span className="ml-2">${item.price}</span>
      <span
        className={`ml-2 flex items-center ${
          item.change >= 0 ? "text-green-500" : "text-red-500"
        }`}
      >
        {item.change >= 0 ? (
          <ArrowUpRight className="h-4 w-4 mr-1" />
        ) : (
          <ArrowDownRight className="h-4 w-4 mr-1" />
        )}
        {Math.abs(item.change).toFixed(2)}%
      </span>
    </div>
  );

  return (
    <div
      className="w-full bg-gray-900 text-white overflow-hidden py-2"
      aria-label="Stock Ticker"
    >
      <div ref={scrollRef} className="flex overflow-x-hidden">
        <div className="flex">{tickerItems.map(renderTickerItem)}</div>
        <div className="flex">{tickerItems.map(renderTickerItem)}</div>
      </div>
    </div>
  );
}
