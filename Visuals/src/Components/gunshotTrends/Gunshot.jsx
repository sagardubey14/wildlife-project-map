"use client";

import { TrendingUp } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// 📊 Sample Data (Replace this with real data)
const gunshotData = [
  { date: "2024-03-01 08:00", gunshotCount: 5 },
  { date: "2024-03-01 12:00", gunshotCount: 12 },
  { date: "2024-03-01 16:00", gunshotCount: 9 },
  { date: "2024-03-02 08:00", gunshotCount: 15 },
  { date: "2024-03-02 12:00", gunshotCount: 6 },
  { date: "2024-03-02 16:00", gunshotCount: 11 },
];

// 🔥 Chart Config
const chartConfig = {
  gunshotCount: {
    label: "Gunshots",
    color: "#ff4d4d", // Direct Red color for better visibility
  },
};

export default function Gunshot({data}) {
  console.log(data[0]);
  const transformedData = data.map((entry) => ({
    date: entry.date,
    gunshotCount: entry.count, // Rename count → gunshotCount
  }));
  console.log(transformedData);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>📊 Gunshot Trends Over Time</CardTitle>
        <CardDescription>Detecting poaching patterns</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={gunshotData}
            margin={{ left: 12, right: 12 }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.split(" ")[1]} // Show only time
            />
            <YAxis />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="gunshotCount"
              type="monotone"
              stroke="#ff4d4d" // Bright red for visibility
              strokeWidth={3}
              dot={false} // Hide dots for a smooth line
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Gunshot activity trend <TrendingUp className="h-4 w-4 text-red-500" />
        </div>
        <div className="leading-none text-muted-foreground">
          Tracking recorded gunshots over time.
        </div>
      </CardFooter>
    </Card>
  );
}
