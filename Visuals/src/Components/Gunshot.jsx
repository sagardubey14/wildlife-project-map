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

const chartConfig = {
  gunshotCount: {
    label: "Gunshots",
    color: "#ff4d4d",
  },
};

export default function Gunshot({ data }) {
  const transformedData = data.map((entry) => ({
    date: entry.x_axis,
    gunshotCount: entry.y_axis,
  }));
  return (
    <>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={transformedData}
            margin={{ left: 12, right: 12 }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis
              domain={['auto', 'dataMax + 1']} // Adjust the max value to ensure it doesn't touch the top
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="gunshotCount"
              type="monotone"
              stroke="#ff4d4d"
              strokeWidth={3}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </>
  );
}
