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

interface StockData {
  name: string;
  price: number;
}

interface StockPerformanceProps {
  data: StockData[];
}

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
              <XAxis
                dataKey="name"
                tick={{ fill: "hsl(var(--foreground))" }}
                axisLine={{ stroke: "hsl(var(--border))" }}
              />
              <YAxis
                domain={["dataMin", "dataMax"]}
                tickFormatter={(value) => `$${value}`}
                tick={{ fill: "hsl(var(--foreground))" }}
                axisLine={{ stroke: "hsl(var(--border))" }}
              />
              <Line
                type="monotone"
                dataKey="price"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={{ r: 4, fill: "hsl(var(--primary))" }}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
