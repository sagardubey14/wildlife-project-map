import { TrendingUp } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  Elephant: {
    label: "Elephant",
    color: "#4f46e5",
  },
  Lion: {
    label: "Lion",
    color: "#f59e0b",
  },
  Zebra: {
    label: "Zebra",
    color: "#10b981",
  },
};

const colorPalette = [
  "#4f46e5", // Blue
  "#f59e0b", // Orange
  "#10b981", // Green
  "#ef4444", // Red
  "#3b82f6", // Light Blue
  "#9333ea", // Purple
  "#f43f5e", // Pink
  "#34d399", // Teal
  "#fb923c", // Light Orange
  "#d1d5db", // Gray
];

export default function MovingAnimalChart({data}) {

  const animalKeys = Object.keys(data[0]).filter(key => key !== 'date' && key !== 'No');

  const transformedData = data.map((entry) =>{
      const {x_axis, ...rest} = entry
      return{
        date: x_axis,
        ...rest,
      }
  });

  console.log(transformedData);
  
  return (
    <>
      <CardHeader>
        <CardTitle>🐾 Moving Animal Trends</CardTitle>
        <CardDescription>Tracking migration patterns</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart width={600} height={300} data={transformedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Legend />
            {animalKeys.map((animal, index) => (
              <Line
                key={animal}
                dataKey={animal}
                stroke={colorPalette[index % colorPalette.length]}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 8 }}
              />
            ))}
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Animal movement trend <TrendingUp className="h-4 w-4 text-green-500" />
        </div>
        <div className="leading-none text-muted-foreground">
          Tracking migration patterns for different species.
        </div>
      </CardFooter>
    </>
  );
}
