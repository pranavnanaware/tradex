"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  TrendingUp,
  Activity,
} from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Line,
  LineChart,
  Bar,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useAnalytics } from "@/hooks/useAnalytics";

// Mock data - replace this with actual API calls
interface Transaction {
  id: number;
  ticker: string;
  quantity: number;
  transaction_type: string;
  price: number;
  timestamp: string;
}

interface Composition {
  name: string;
  value: number;
}

interface PerformanceData {
  date: string;
  value: number;
}

interface StockPerformance {
  name: string;
  performance: number;
}

interface PortfolioData {
  totalValue: number;
  totalStocks: number;
  totalProfitLoss: number;
  bestPerformer: string;
  recentTransactions: Transaction[];
  portfolioComposition: Composition[];
  performanceData: PerformanceData[];
  stockPerformance: StockPerformance[];
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

export default function PortfolioPage() {
  const [portfolioData, setPortfolioData] = useState<PortfolioData>({
    totalValue: 0,
    totalStocks: 0,
    totalProfitLoss: 0,
    bestPerformer: "",
    recentTransactions: [],
    portfolioComposition: [],
    performanceData: [],
    stockPerformance: [],
  });

  const { data, isLoading, isError, isSuccess } = useAnalytics();

  useEffect(() => {
    if (isSuccess) {
      setPortfolioData(data);
    }
  }, [data]);
  return (
    <div className="container mx-auto p-4 ">
      <h1 className="text-3xl font-bold mb-6">Stock Portfolio</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="bg-transparent shadow-black">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 ">
            <CardTitle className="text-sm font-medium">
              Total Portfolio Value
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="">
            <div className="text-2xl font-bold">
              ${portfolioData.totalValue.toLocaleString()}
            </div>
          </CardContent>
        </Card>
        <Card className="bg-transparent shadow-black">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Stocks</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {portfolioData.totalStocks}
            </div>
          </CardContent>
        </Card>
        <Card className="bg-transparent shadow-black">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Profit/Loss
            </CardTitle>
            {portfolioData.totalProfitLoss >= 0 ? (
              <ArrowUpRight className="h-4 w-4 text-green-600" />
            ) : (
              <ArrowDownRight className="h-4 w-4 text-red-600" />
            )}
          </CardHeader>
          <CardContent>
            <div
              className={`text-2xl font-bold ${
                portfolioData.totalProfitLoss >= 0
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              ${Math.abs(portfolioData.totalProfitLoss).toLocaleString()}
            </div>
          </CardContent>
        </Card>
        <Card className="bg-transparent shadow-black">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Best Performer
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {portfolioData.bestPerformer}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card className="bg-transparent shadow-black">
          <CardHeader>
            <CardTitle>Portfolio Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                value: {
                  label: "Portfolio Value",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={portfolioData.performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="var(--color-value)"
                    name="Portfolio Value"
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="bg-transparent">
          <CardHeader>
            <CardTitle>Stock Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                performance: {
                  label: "Performance (%)",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={portfolioData.stockPerformance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar
                    dataKey="performance"
                    fill="var(--color-performance)"
                    name="Performance (%)"
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-transparent">
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ticker</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {portfolioData.recentTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium">
                      {transaction.ticker}
                    </TableCell>
                    <TableCell>{transaction.transaction_type}</TableCell>
                    <TableCell>{transaction.quantity}</TableCell>
                    <TableCell>${transaction.price.toFixed(2)}</TableCell>
                    <TableCell>
                      {new Date(transaction.timestamp).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="bg-transparent">
          <CardHeader>
            <CardTitle>Portfolio Composition</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                value: {
                  label: "Value",
                  color: "hsl(var(--chart-3))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={portfolioData.portfolioComposition}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {portfolioData.portfolioComposition.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
