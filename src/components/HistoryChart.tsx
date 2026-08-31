"use client";

import * as React from "react";
import * as RechartsPrimitive from "recharts";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import type { TooltipValueType } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type TooltipNameType = number | string;

export const description = "An interactive area chart";

const chartData = [
  { "date": "2024-04-01", "desktop": 381 },
  { "date": "2024-04-02", "desktop": 314 },
  { "date": "2024-04-03", "desktop": 303 },
  { "date": "2024-04-04", "desktop": 394 },
  { "date": "2024-04-05", "desktop": 335 },
  { "date": "2024-04-06", "desktop": 331 },
  { "date": "2024-04-07", "desktop": 328 },
  { "date": "2024-04-08", "desktop": 317 },
  { "date": "2024-04-09", "desktop": 394 },
  { "date": "2024-04-10", "desktop": 313 },
  { "date": "2024-04-11", "desktop": 386 },
  { "date": "2024-04-12", "desktop": 394 },
  { "date": "2024-04-13", "desktop": 369 },
  { "date": "2024-04-14", "desktop": 311 },
  { "date": "2024-04-15", "desktop": 375 },
  { "date": "2024-04-16", "desktop": 354 },
  { "date": "2024-04-17", "desktop": 304 },
  { "date": "2024-04-18", "desktop": 303 },
  { "date": "2024-04-19", "desktop": 311 },
  { "date": "2024-04-20", "desktop": 327 },
  { "date": "2024-04-21", "desktop": 329 },
  { "date": "2024-04-22", "desktop": 364 },
  { "date": "2024-04-23", "desktop": 377 },
  { "date": "2024-04-24", "desktop": 303 },
  { "date": "2024-04-25", "desktop": 371 },
  { "date": "2024-04-26", "desktop": 325 },
  { "date": "2024-04-27", "desktop": 391 },
  { "date": "2024-04-28", "desktop": 383 },
  { "date": "2024-04-29", "desktop": 389 },
  { "date": "2024-04-30", "desktop": 369 },
  { "date": "2024-05-01", "desktop": 353 },
  { "date": "2024-05-02", "desktop": 328 },
  { "date": "2024-05-03", "desktop": 357 },
  { "date": "2024-05-04", "desktop": 375 },
  { "date": "2024-05-05", "desktop": 335 },
  { "date": "2024-05-06", "desktop": 300 },
  { "date": "2024-05-07", "desktop": 397 },
  { "date": "2024-05-08", "desktop": 320 },
  // { date: "2024-05-09", desktop: 227 },
  // { date: "2024-05-10", desktop: 293 },
  // { date: "2024-05-11", desktop: 335 },
  // { date: "2024-05-12", desktop: 197 },
  // { date: "2024-05-13", desktop: 197 },
  // { date: "2024-05-14", desktop: 448 },
  // { date: "2024-05-15", desktop: 473 },
  // { date: "2024-05-16", desktop: 338 },
  // { date: "2024-05-17", desktop: 499 },
  // { date: "2024-05-18", desktop: 315 },
  // { date: "2024-05-19", desktop: 235 },
  // { date: "2024-05-20", desktop: 177 },
  // { date: "2024-05-21", desktop: 82 },
  // { date: "2024-05-22", desktop: 81 },
  // { date: "2024-05-23", desktop: 252 },
  // { date: "2024-05-24", desktop: 294 },
  // { date: "2024-05-25", desktop: 201 },
  // { date: "2024-05-26", desktop: 213 },
  // { date: "2024-05-27", desktop: 420 },
  // { date: "2024-05-28", desktop: 233 },
  // { date: "2024-05-29", desktop: 78 },
  // { date: "2024-05-30", desktop: 340 },
  // { date: "2024-05-31", desktop: 178 },
  // { date: "2024-06-01", desktop: 178 },
  // { date: "2024-06-02", desktop: 470 },
  // { date: "2024-06-03", desktop: 103 },
  // { date: "2024-06-04", desktop: 439 },
  // { date: "2024-06-05", desktop: 88 },
  // { date: "2024-06-06", desktop: 294 },
  // { date: "2024-06-07", desktop: 323 },
  // { date: "2024-06-08", desktop: 385 },
  // { date: "2024-06-09", desktop: 438 },
  // { date: "2024-06-10", desktop: 155 },
  // { date: "2024-06-11", desktop: 92 },
  // { date: "2024-06-12", desktop: 492 },
  // { date: "2024-06-13", desktop: 81 },
  // { date: "2024-06-14", desktop: 426 },
  // { date: "2024-06-15", desktop: 307 },
  // { date: "2024-06-16", desktop: 371 },
  // { date: "2024-06-17", desktop: 475 },
  // { date: "2024-06-18", desktop: 107 },
  // { date: "2024-06-19", desktop: 341 },
  // { date: "2024-06-20", desktop: 408 },
  // { date: "2024-06-21", desktop: 169 },
  // { date: "2024-06-22", desktop: 317 },
  // { date: "2024-06-23", desktop: 480 },
  // { date: "2024-06-24", desktop: 132 },
  // { date: "2024-06-25", desktop: 141 },
  // { date: "2024-06-26", desktop: 434 },
  // { date: "2024-06-27", desktop: 448 },
  // { date: "2024-06-28", desktop: 349 },
  // { date: "2024-06-29", desktop: 303 },
  // { date: "2024-06-30", desktop: 446 },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  desktop: {
    label: "Desktop",
    color: "var(--color-lime-500)",
  },
} satisfies ChartConfig;

export default function HistoryChart() {
  const [timeRange, setTimeRange] = React.useState<any>("90d");

  const [activeData, setActiveData] = React.useState<{
    date: any;
    amount: any;
  } | null>({ date: chartData[0].date, amount: chartData[0].desktop });

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date("2024-06-30");
    let daysToSubtract = 90;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

  return (
    <Card className="bg-neutral-700 rounded-3xl">
      {/* <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Area Chart - Interactive</CardTitle>
          <CardDescription>
            Showing total visitors for the last 3 months
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader> */}
      <CardHeader className="h-0 px-5 pt-1 flex justify-between">
        <div className="text-sm tracking-widest">
          {'USD' + '/' + 'EUR'}
        </div>
        <div className="flex items-center gap-2 text-neutral-200 text-xs uppercase tracking-wider">
          <div>{activeData?.amount}</div>
          <div className="px-1">
            <svg width="3" height="3" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 3C0 1.34315 1.34315 0 3 0C4.65685 0 6 1.34315 6 3C6 4.65685 4.65685 6 3 6C1.34315 6 0 4.65685 0 3Z" fill="var(--color-neutral-200)" />
            </svg>
          </div>
          <div>{activeData?.date && new Date(activeData?.date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })}</div>
          <div>{'16:00 CET'}</div>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 pl-2 sm:pr-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[300px] w-full"
          onMouseLeave={() => setActiveData({ date: chartData[0].date, amount: chartData[0].desktop })}
        >
          <AreaChart
            data={filteredData}
            onMouseMove={(e) => {
              if (e && e.activeIndex && Number(e.activeIndex) > 0) {
                const currentData: any = e.activeIndex ? chartData[Number(e.activeIndex)] : { date: chartData[0].date, amount: chartData[0].desktop };
                setActiveData({
                  date: currentData.date,
                  amount: currentData.desktop
                })
              } else {
                setActiveData({ date: chartData[0].date, amount: chartData[0].desktop });
              }
            }}
          >
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="80%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.01}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray={'2 4'} stroke="var(--color-neutral-500)" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <YAxis
              dataKey="desktop"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              content={<CustomChartTooltipContent />}
            />
            <Area
              dataKey="desktop"
              type="linear"
              fill="url(#fillDesktop)"
              stroke="var(--color-desktop)"
              stackId="a"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

function CustomChartTooltipContent({
  active,
  payload,
  className,
  indicator = "dot",
  hideLabel = false,
  hideIndicator = false,
  label,
  labelFormatter,
  labelClassName,
  formatter,
  color,
  nameKey,
  labelKey,
}: React.ComponentProps<typeof RechartsPrimitive.Tooltip> &
  React.ComponentProps<"div"> & {
    hideLabel?: boolean;
    hideIndicator?: boolean;
    indicator?: "line" | "dot" | "dashed";
    nameKey?: string;
    labelKey?: string;
  } & Omit<
    RechartsPrimitive.DefaultTooltipContentProps<
      TooltipValueType,
      TooltipNameType
    >,
    "accessibilityLayer"
  >) {
  return null;
}
