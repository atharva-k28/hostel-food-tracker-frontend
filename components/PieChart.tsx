"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

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

interface PieChartComponentProps {
  meal: string;
  range: string;
}

export function PieChartComponent({ meal, range }: PieChartComponentProps) {
  const [chartData, setChartData] = React.useState<
    { label: string; count: number; fill: string }[]
  >([]);
  const [data, setData] = React.useState<{ eaten: number; total: number }>({ eaten: 0, total: 0 });
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const res = await fetch(
          `/api/pieData?meal=${meal}&range=${range}`
        );
        const data = await res.json();

        if (!res.ok) throw new Error(data.error || "Failed to fetch data");

        setChartData([
          { label: "Eaten", count: data.count, fill: 'hsl(var(--chart-2))' },
          { label: "Not Eaten", count: data.totalStudents - data.count, fill: 'hsl(var(--chart-1))' },
          //059669  F97A7A "hsl(var(--chart-2))" "hsl(var(--chart-1))"
        ]);
        setData({ eaten: data.count, total: data.totalStudents });
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [meal, range]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <Card className="flex flex-col shadow-md">
      <CardHeader className="flex flex-col items-center text-center pb-2 space-y-1">
  <CardTitle className="text-lg sm:text-xl font-semibold text-gray-90sl0">
    Meal Distribution - <span className="text-emerald-600">{`${meal[0].toUpperCase()}${meal.slice(1)}`}</span>
  </CardTitle>
  <CardDescription className="text-sm sm:text-base text-gray-600">
    Showing data for: <span className="font-medium text-gray-800">{`${range[0].toUpperCase()}${range.slice(1)}`}</span>
  </CardDescription>
</CardHeader>

      <CardContent className="flex-1 pb-0">
      <ChartContainer
  config={{ count: { label: "Count" } }}
  className="mx-auto w-full max-w-[300px] sm:max-w-[350px] md:max-w-[400px] aspect-square"
>
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="label"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-2xl font-bold"
                        >
                          {(((data.eaten/data.total)*100).toFixed(2)).toLocaleString()+"%"}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Students Eaten
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        {/* <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          {data.count} students had {meal} in the {range} period.
        </div> */}
      </CardFooter>
    </Card>
  );
}

export default PieChartComponent;
