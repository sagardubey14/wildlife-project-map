import { TrendingUp } from "lucide-react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
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
  datasource1: {
    label: "Datasource 1",
    color: "#8884d8",
  },
  datasource2: {
    label: "Datasource 2",
    color: "#82ca9d",
  },
  datasource3: {
    label: "Datasource 3",
    color: "#ffc658",
  },
  datasource4: {
    label: "Datasource 4",
    color: "#ff7300",
  },
};

const transformedData = [
  { animal: "lion", datasource1: 36, datasource2: 52, datasource3: 52, datasource4: 56 },
  { animal: "hyena", datasource1: 60, datasource2: 51, datasource3: 50, datasource4: 62 },
  { animal: "fox", datasource1: 65, datasource2: 64, datasource3: 54, datasource4: 59 },
  { animal: "cheetah", datasource1: 46, datasource2: 47, datasource3: 62, datasource4: 56 },
  { animal: "wolf", datasource1: 54, datasource2: 56, datasource3: 59, datasource4: 45 },
  { animal: "tiger", datasource1: 59, datasource2: 52, datasource3: 49, datasource4: 50 }
];

export default function AnimalRadarChart({ data }) {

  return (
    <>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart outerRadius="80%" data={data}> {/* Adjust outerRadius based on container size */}
              <PolarGrid />
              <PolarAngleAxis dataKey="animal" />
              <PolarRadiusAxis angle={90} />
              <Legend />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Radar name="Datasource 1" dataKey="datasource1" stroke={chartConfig.datasource1.color} fill={chartConfig.datasource1.color} fillOpacity={0.6} />
              <Radar name="Datasource 2" dataKey="datasource2" stroke={chartConfig.datasource2.color} fill={chartConfig.datasource2.color} fillOpacity={0.6} />
              <Radar name="Datasource 3" dataKey="datasource3" stroke={chartConfig.datasource3.color} fill={chartConfig.datasource3.color} fillOpacity={0.6} />
              <Radar name="Datasource 4" dataKey="datasource4" stroke={chartConfig.datasource4.color} fill={chartConfig.datasource4.color} fillOpacity={0.6} />
            </RadarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </>
  );
}
