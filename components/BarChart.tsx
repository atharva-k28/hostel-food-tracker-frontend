"use client";

import { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";


type MealData = {
  date: string;
  day: string;
  breakfast: number;
  lunch: number;
  dinner: number;
};

export default function BarGraphComponent() {
  const [chartData, setChartData] = useState<MealData[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/barGraphData"); // Replace with your actual API route
        const data: MealData[] = await response.json();
        setChartData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  // Chart configuration
  const chartConfig: ChartConfig = {
    breakfast: { label: "Breakfast", color: "hsl(var(--chart-1))" },
    lunch: { label: "Lunch", color: "hsl(var(--chart-2))" },
    dinner: { label: "Dinner", color: "hsl(var(--chart-3))" },
  };

  return (
    <Card className="bg-white shadow-md rounded-lg p-4 border border-gray-200">
      <CardHeader className="mb-2">
        <CardTitle className="text-lg font-semibold text-emerald-600">Meal Statistics</CardTitle>
        <CardDescription className="text-sm text-gray-700">
          Meal consumption trends for the last 7 days
        </CardDescription>
      </CardHeader>

      <CardContent className="overflow-hidden">
        <ChartContainer config={chartConfig}>
          <BarChart data={chartData} width={600} height={280}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="day"
              tickLine={false}
              tickMargin={8}
              axisLine={false}
              className="text-xs text-gray-600"
            />
            <YAxis className="text-xs text-gray-600" />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
            <Bar dataKey="breakfast" fill="var(--color-breakfast)" radius={2} />
            <Bar dataKey="lunch" fill="var(--color-lunch)" radius={2} />
            <Bar dataKey="dinner" fill="var(--color-dinner)" radius={2} />
          </BarChart>
        </ChartContainer>
      </CardContent>

      {/* <CardFooter className="flex flex-col items-start gap-2 text-sm text-gray-600">
        <div className="flex gap-2 font-medium leading-none text-emerald-700">
          Trending up by 5.2% this week <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Displaying meals per day over the last 7 days.
        </div>
      </CardFooter> */}
    </Card>
  );
}
