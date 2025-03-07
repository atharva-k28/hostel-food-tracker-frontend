"use client";

import { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
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
  const [chartWidth, setChartWidth] = useState(600); // Default width

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/barGraphData");
        const data: MealData[] = await response.json();
        setChartData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth < 768 ? window.innerWidth - 40 : 600; // Adjust for smaller screens
      setChartWidth(newWidth);
    };

    handleResize(); // Set initial width
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const chartConfig: ChartConfig = {
    breakfast: { label: "Breakfast", color: "hsl(var(--chart-1))" },
    lunch: { label: "Lunch", color: "hsl(var(--chart-2))" },
    dinner: { label: "Dinner", color: "hsl(var(--chart-3))" },
  };

  return (
    <Card className="bg-white shadow-md rounded-lg p-4 border border-gray-200 w-full">
      <CardHeader className="mb-2">
        <CardTitle className="text-lg sm:text-xl font-semibold text-gray-900">
          Meal Statistics
        </CardTitle>
        <CardDescription className="text-sm text-gray-700">
          Meal consumption trends for the last 7 days
        </CardDescription>
      </CardHeader>

      <CardContent className="overflow-x-auto">
        <div className="min-w-[500px] sm:min-w-[600px]">
          <ChartContainer config={chartConfig}>
            <BarChart data={chartData} width={chartWidth} height={280}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis
                dataKey="day"
                tickFormatter={(day) => {
                  if (window.innerWidth < 505) return day.slice(0, 1);
                  if (window.innerWidth < 1180) return day.slice(0, 3);
                  return day;
                }}
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
        </div>
      </CardContent>
    </Card>
  );
}
