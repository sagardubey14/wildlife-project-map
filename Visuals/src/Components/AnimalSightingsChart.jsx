import { TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

// Sample Data
const animalSightings = [
  { animal: "Elephant", count: 45 },
  { animal: "Lion", count: 30 },
  { animal: "Zebra", count: 50 },
  { animal: "Giraffe", count: 20 },
  { animal: "Rhino", count: 15 },
];

// Chart Config
const chartConfig = {
  count: {
    label: "Sightings",
    color: "#3b82f6",
  },
};

export default function AnimalSightingsChart({data}) {
  
  return (
    <>
      <CardHeader>
        <CardTitle>📊 Animal Sightings Count</CardTitle>
        <CardDescription>Most detected animals</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart width={500} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="animal" />
            <YAxis />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar dataKey="count" fill="#3b82f6" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
  <div className="flex gap-2 font-medium leading-none">
    Animal sightings count <TrendingUp className="h-4 w-4 text-green-500" />
  </div>
  <div className="leading-none text-muted-foreground">
    Displaying the most detected animals across different sources.
  </div>
</CardFooter>

    </>
  );
}
