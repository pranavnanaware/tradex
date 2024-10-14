"use client";

import React from "react";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Define the structure of the stock data
interface StockData {
  name: string;
  price: number;
}

// Define the props for the StockPerformance component
interface StockPerformanceProps {
  data: StockData[];
}

// StockPerformance component to display stock price performance chart
export default function StockPerformance({ data }: StockPerformanceProps) {
  return (
    <Card className="w-full h-full flex flex-col bg-neutral-900 shadow-black">
      <CardHeader className="flex-none">
        <CardTitle>Stock Price Performance</CardTitle>
        <CardDescription>
          Stock price across different time frames
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow min-h-0">
        <ChartContainer
          config={{
            price: {
              label: "Price",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="w-full h-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              {/* XAxis for the chart, displaying the name of the stock */}
              <XAxis
                dataKey="name"
                tick={{ fill: "hsl(var(--foreground))" }}
                axisLine={{ stroke: "hsl(var(--border))" }}
              />
              {/* YAxis for the chart, displaying the price of the stock */}
              <YAxis
                domain={["dataMin", "dataMax"]}
                tickFormatter={(value) => `$${value}`}
                tick={{ fill: "hsl(var(--foreground))" }}
                axisLine={{ stroke: "hsl(var(--border))" }}
              />
              {/* Line component to plot the stock price */}
              <Line
                type="monotone"
                dataKey="price"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={{ r: 4, fill: "hsl(var(--primary))" }}
              />
              {/* Tooltip for the chart */}
              <ChartTooltip content={<ChartTooltipContent />} />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
