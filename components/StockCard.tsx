import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Apple } from "lucide-react";

interface StockCardProps {
  companyName: string;
  symbol: string;
  exchange: string;
  price: number;
  priceChange: number;
  percentChange: number;
  marketStatus: string;
  industry: string;
  eps: number;
  marketCap: string;
  divYield: string;
  pe: number;
}

export default function StockCard({
  companyName,
  symbol,
  exchange,
  price,
  priceChange,
  percentChange,
  marketStatus,
  industry,
  eps,
  marketCap,
  divYield,
  pe,
}: StockCardProps) {
  const isNegative = priceChange < 0;

  return (
    <Card className="w-full  bg-zinc-900 text-white">
      <CardHeader className="pb-2">
        <div className="flex items-center space-x-4">
          <div>
            <h2 className="text-2xl font-bold">{companyName}</h2>
            <p className="text-sm text-zinc-400">
              {symbol}{" "}
              <span className="ml-2 rounded-full bg-blue-500 px-2 py-0.5 text-xs">
                {exchange}
              </span>
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-end mb-4">
          <div>
            <span className="text-4xl font-bold">{price.toFixed(2)}</span>
            <span className="text-sm ml-1">USD</span>
            <span
              className={`ml-2 ${
                isNegative ? "text-red-500" : "text-green-500"
              }`}
            >
              {priceChange.toFixed(2)} ({percentChange.toFixed(2)}%)
            </span>
          </div>
          <div className="text-xs text-zinc-400 uppercase">{marketStatus}</div>
        </div>
        <div className="grid grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-zinc-400 text-xs mb-1">Industry</p>
            <p className="font-semibold">{industry}</p>
          </div>
          <div>
            <p className="text-zinc-400 text-xs mb-1">EPS</p>
            <p className="font-semibold">{eps.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-zinc-400 text-xs mb-1">MARKET CAP</p>
            <p className="font-semibold">{marketCap}</p>
          </div>
          <div>
            <p className="text-zinc-400 text-xs mb-1">DIV YIELD</p>
            <p className="font-semibold">{divYield}</p>
          </div>
          <div>
            <p className="text-zinc-400 text-xs mb-1">P/E</p>
            <p className="font-semibold">{pe.toFixed(2)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
