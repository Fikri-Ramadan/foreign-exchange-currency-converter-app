"use client";

import * as React from "react";
import * as RechartsPrimitive from "recharts";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import type { TooltipValueType } from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  type ChartConfig,
} from "@/components/ui/chart";
import { RateHistory } from "@/types";
import { formatCurrency } from "@/lib/utils";

type TooltipNameType = number | string;

const chartConfig = {
  rate: {
    label: "Rate",
    color: "var(--color-lime-500)",
  },
} satisfies ChartConfig;

export default function HistoryChart({ base, quote, data }: { base: string; quote: string; data: RateHistory[]; }) {
  const defaultValue = { date: data[data?.length - 1]?.date ?? new Date(), amount: data[data?.length - 1]?.rate ?? 0 };
  const [activeData, setActiveData] = React.useState<{
    date: any;
    amount: any;
  } | null>(
    { ...defaultValue }
  );
  const dateToDisplay = activeData?.date ? new Date(activeData.date) : null;
  const isCurrentYear = dateToDisplay?.getFullYear() === new Date().getFullYear();

  return (
    <Card className="bg-neutral-700 rounded-2xl">
      <CardHeader className="h-0 px-5 pt-1 flex justify-between">
        <div className="text-sm tracking-widest">
          {base + '/' + quote}
        </div>
        <div className="flex items-center gap-2 text-neutral-200 text-xs uppercase tracking-wider">
          <div>{formatCurrency(activeData?.amount, 4)}</div>
          <div className="px-1">
            <svg width="3" height="3" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 3C0 1.34315 1.34315 0 3 0C4.65685 0 6 1.34315 6 3C6 4.65685 4.65685 6 3 6C1.34315 6 0 4.65685 0 3Z" fill="var(--color-neutral-200)" />
            </svg>
          </div>
          <div>
            {dateToDisplay && dateToDisplay.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: isCurrentYear ? undefined : "numeric",
            })}
          </div>
          <div>{'16:00 CET'}</div>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 pl-2 sm:pr-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[300px] w-full"
          onMouseLeave={() => setActiveData({ ...defaultValue })}
        >
          <AreaChart
            data={data}
            onMouseMove={(e) => {
              if (e && e?.activeIndex && Number(e?.activeIndex) >= 0) {
                const currentData: any = e.activeIndex ? data[Number(e.activeIndex)] : defaultValue;
                setActiveData({
                  date: currentData.date,
                  amount: currentData.rate
                });
              } else {
                setActiveData({ ...defaultValue });
              }
            }}
          >
            <defs>
              <linearGradient id="fillRate" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-rate)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="70%"
                  stopColor="var(--color-rate)"
                  stopOpacity={0.1}
                />
                <stop
                  offset="90%"
                  stopColor="var(--color-rate)"
                  stopOpacity={0.01}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-rate)"
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
              dataKey="rate"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              domain={['dataMin - 0.001', 'auto']}
              allowDecimals={true}
            />
            <ChartTooltip
              content={<CustomChartTooltipContent />}
            />
            <Area
              dataKey="rate"
              type="linear"
              fill="url(#fillRate)"
              stroke="var(--color-rate)"
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
