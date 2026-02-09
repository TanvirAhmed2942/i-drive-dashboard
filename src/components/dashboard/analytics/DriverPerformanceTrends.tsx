"use client";

import React from "react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export type DriverPerformanceDataPoint = {
  week: string;
  earnings: number;
  rides: number;
};

type DriverPerformanceTrendsProps = {
  data?: DriverPerformanceDataPoint[];
  className?: string;
};

const EARNINGS_COLOR = "#4CAF50";
const RIDES_COLOR = "#2196F3";

const defaultData: DriverPerformanceDataPoint[] = [
  { week: "Week 1", earnings: 5000, rides: 800 },
  { week: "Week 2", earnings: 5500, rides: 900 },
  { week: "Week 3", earnings: 6000, rides: 850 },
  { week: "Week 4", earnings: 6800, rides: 950 },
];

export default function DriverPerformanceTrends({
  data = defaultData,
  className,
}: DriverPerformanceTrendsProps) {
  return (
    <Card
      className={cn(
        "overflow-hidden rounded-lg border border-indigo-500/20 bg-[#121221] shadow-sm",
        className
      )}
    >
      <CardHeader className="space-y-1 px-6 pb-2">
        <CardTitle className="text-xl font-bold text-white">
          Driver Performance Trends
        </CardTitle>
        <CardDescription className="text-sm text-zinc-400">
          Weekly rides and earnings overview
        </CardDescription>
      </CardHeader>
      <CardContent className="px-6 pb-6 pt-2">
        <div className="h-[280px] min-h-[280px] w-full min-w-0">
          <ResponsiveContainer width="100%" height={280}>
            <ComposedChart
              data={data}
              margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient
                  id="earningsGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor={EARNINGS_COLOR}
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="100%"
                    stopColor={EARNINGS_COLOR}
                    stopOpacity={0.05}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.12)"
                vertical={true}
                horizontal={true}
              />
              <XAxis
                dataKey="week"
                tick={{ fontSize: 12, fill: "rgba(255,255,255,0.8)" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "rgba(255,255,255,0.8)" }}
                axisLine={false}
                tickLine={false}
                domain={[0, 8000]}
                ticks={[0, 2000, 4000, 6000, 8000]}
                tickFormatter={(v) => String(v)}
              />
              <Tooltip
                cursor={{ stroke: "rgba(255,255,255,0.2)" }}
                contentStyle={{
                  borderRadius: "var(--radius)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  backgroundColor: "#1e293b",
                  color: "#f8fafc",
                }}
                formatter={(value, name) => [value ?? 0, name]}
                itemStyle={{ color: "#f8fafc" }}
              />
              <Legend
                wrapperStyle={{ paddingTop: "12px" }}
                align="center"
                formatter={(value) => (
                  <span
                    className="text-sm"
                    style={{
                      color:
                        value === "earnings" ? EARNINGS_COLOR : RIDES_COLOR,
                    }}
                  >
                    {value}
                  </span>
                )}
                iconType="circle"
                iconSize={8}
              />
              <Area
                type="monotone"
                dataKey="earnings"
                name="earnings"
                stroke={EARNINGS_COLOR}
                strokeWidth={2}
                fill="url(#earningsGradient)"
                dot={{ fill: EARNINGS_COLOR, r: 4 }}
                activeDot={{ r: 5, fill: EARNINGS_COLOR, stroke: "#fff" }}
              />
              <Line
                type="monotone"
                dataKey="rides"
                name="rides"
                stroke={RIDES_COLOR}
                strokeWidth={2}
                dot={{ fill: RIDES_COLOR, r: 4 }}
                activeDot={{ r: 5, fill: RIDES_COLOR, stroke: "#fff" }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
