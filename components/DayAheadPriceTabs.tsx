"use client";

import React, { useState } from "react";
import { CustomTabs } from "./CustomTabs";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { TrendingUp } from "lucide-react";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue  } from "@/components/ui/select";

interface DayAheadPriceTabsProps {
  prices?: number[];
}

export const DayAheadPriceTabs: React.FC<DayAheadPriceTabsProps> = ({ prices }) => {
  const [selectedTime, setSelectedTime] = useState<string>("");

  if (!prices || prices.length === 0) {
    return <div>No price data available for this day.</div>;
  }


  const times = ["All Hours", ...prices.map((_, index) => `${index}:00`)];

  const filteredPrices = selectedTime && selectedTime !== "All Hours"
    ? prices.map((price, index) => ({
        hour: `${index}:00`,
        price,
      })).filter((data) => data.hour === selectedTime)
    : prices.map((price, index) => ({
        hour: `${index}:00`,
        price,
      }));

  const currentHour = new Date().getHours();
  const currentPrice = prices[currentHour];
  const nextHourPrice = prices[currentHour + 1] || "N/A";
  const dailyHigh = Math.max(...prices);
  const dailyLow = Math.min(...prices);
  const formatTime = (hour: number) => {
    return new Date(0, 0, 0, hour).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };
  const barChartData = [
    { label: " High", value: dailyHigh, fill: "var(--color-high)" },
    { label: " Low", value: dailyLow, fill: "var(--color-low)" },
  ];

  const chartConfig = {
    price: {
      label: "Price",
      color: "hsl(var(--chart-1))",
    },
    high: {
      label: "High",
      color: "hsl(var(--chart-2))",
    },
    low: {
      label: "Low",
      color: "hsl(var(--chart-3))",
    },
  } satisfies ChartConfig;

  const tabs = [
    {
        label: "Current Price",
        content: (
          <div className="w-auto p-20">
            <h2 className="text-lg font-semibold mb-2">Current Price</h2>
            <p className="text-sm">
              <span className="font-bold">Time:</span> {formatTime(currentHour)}
            </p>
            <p className="text-sm">
              <span className="font-bold">Price:</span> {currentPrice} EUR
            </p>
            <p className="text-sm mt-2">
              <span className="font-bold">Next Hour:</span> {formatTime(currentHour + 1)} - {nextHourPrice} EUR
            </p>
          </div>
        ),
      },
    {
        label: "Hourly Overview",
        content: (
          <Card  className="w-3/4 p-4 mx-auto text-center border">
            <CardHeader>
              <CardTitle>Hourly Prices</CardTitle>
              <CardDescription>Today</CardDescription>
            </CardHeader>
            <CardContent>
            {/* Time Filter */}
            <div className=" z-110 mt-5 mb-4">
              <Select onValueChange={(value) => setSelectedTime(value)} value={selectedTime}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select time..." />
                </SelectTrigger>
                <SelectContent className="z-20">
                  {times.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="relative z-10">
              <ChartContainer config={chartConfig}>
                <BarChart accessibilityLayer data={filteredPrices}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="hour"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dashed" />}
                  />
                  <Bar dataKey="price" fill="var(--color-price)" radius={4} />
                </BarChart>
              </ChartContainer>
              </div>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
              <div className="flex gap-2 font-medium leading-none">
                Trending up by 5.2% this hour <TrendingUp className="h-4 w-4" />
              </div>
              <div className="leading-none text-muted-foreground">
                Showing hourly prices for today
              </div>
            </CardFooter>
          </Card>
        ),
      },
    {
      label: "Daily High/Low",
      content: (
        <Card className="w-3/4 p-4 mx-auto text-center border">
          <CardHeader>
            <CardTitle>Bar Chart - Daily High/Low</CardTitle>
            <CardDescription>Today</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
              <BarChart
                accessibilityLayer
                data={barChartData}
                layout="vertical"
                margin={{ left: 0 }}
              >
                <YAxis
                  dataKey="label"
                  type="category"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value}
                />
                <XAxis dataKey="value" type="number" hide />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Bar dataKey="value" layout="vertical" radius={5} />
              </BarChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="flex gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="leading-none text-muted-foreground">
              Showing daily high/low for today
            </div>
          </CardFooter>
        </Card>
      ),
    },
  ];

  return <CustomTabs tabs={tabs} />;
};
