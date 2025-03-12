import { TrendingUp } from "lucide-react";
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";
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

const dataSourceData = [
  { source: "Camera Traps", value: 45 },
  { source: "Drones", value: 30 },
  { source: "Ranger Reports", value: 20 },
  { source: "Community Reports", value: 15 },
];

const COLORS = ["#4f46e5", "#f59e0b", "#10b981", "#ef4444"];

export default function DataSourcePieChart({ data }) {
  return (
    <>
      <CardHeader>
        <CardTitle>📊 Data Source Contribution</CardTitle>
        <CardDescription>Which sources provide more data?</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={{}}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="source"
                cx="50%"
                cy="50%"
                outerRadius="40%"
                label
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Data source contribution{" "}
          <TrendingUp className="h-4 w-4 text-blue-500" />
        </div>
        <div className="leading-none text-muted-foreground">
          Analyzing the contribution of different data sources in the overall
          dataset.
        </div>
      </CardFooter>
    </>
  );
}
