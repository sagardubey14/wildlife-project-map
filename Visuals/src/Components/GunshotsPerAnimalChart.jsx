"use client";

import { TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts"; // Assuming ShadCN's charting library
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
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";


// Chart Config
const chartConfig = {
  Yes: { label: "Gunshots Heard", color: "#ff4d4d" },
  No: { label: "No Gunshots", color: "#10b981" },
};

export default function GunshotsPerAnimalChart({data}) {

  return (
    <>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart width={500} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="animal" />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="Yes"
              stackId="a"
              fill="var(--color-Yes)"
              radius={[0, 0, 4, 4]}
            />
            <Bar
              dataKey="No"
              stackId="a"
              fill="var(--color-No)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </>
  );
}
