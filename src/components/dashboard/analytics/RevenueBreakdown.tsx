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
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export type RevenueBreakdownDataPoint = {
  month: string;
  revenue: number;
  driverEarnings: number;
  commission: number;
};

type RevenueBreakdownProps = {
  data?: RevenueBreakdownDataPoint[];
  className?: string;
};

const REVENUE_COLOR = "#2196F3"; // blue
const DRIVER_EARNINGS_COLOR = "#4CAF50"; // green
const COMMISSION_COLOR = "#FF9800"; // orange

const defaultData: RevenueBreakdownDataPoint[] = [
  { month: "Jan", revenue: 62000, driverEarnings: 48000, commission: 14000 },
  { month: "Feb", revenue: 65000, driverEarnings: 50000, commission: 15000 },
  { month: "Mar", revenue: 60000, driverEarnings: 47000, commission: 13000 },
  { month: "Apr", revenue: 58000, driverEarnings: 45000, commission: 13000 },
  { month: "May", revenue: 72000, driverEarnings: 56000, commission: 16000 },
  { month: "Jun", revenue: 78000, driverEarnings: 61000, commission: 17000 },
  { month: "Jul", revenue: 82000, driverEarnings: 64000, commission: 18000 },
];

export default function RevenueBreakdown({
  data = defaultData,
  className,
}: RevenueBreakdownProps) {
  return (
    <Card
      className={cn(
        "overflow-hidden rounded-lg border border-indigo-500/20 bg-[#121221] shadow-sm",
        className
      )}
    >
      <CardHeader className="space-y-1 px-6 pb-2">
        <CardTitle className="text-xl font-bold text-white">
          Revenue Breakdown
        </CardTitle>
        <CardDescription className="text-sm text-zinc-400">
          Monthly revenue, commission, and driver earnings
        </CardDescription>
      </CardHeader>
      <CardContent className="px-6 pb-6 pt-2">
        <div className="h-[280px] min-h-[280px] w-full min-w-0">
          <ResponsiveContainer width="100%" height={280}>
            <LineChart
              data={data}
              margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.12)"
                vertical={true}
                horizontal={true}
              />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 12, fill: "rgba(255,255,255,0.8)" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "rgba(255,255,255,0.8)" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => v >= 1000 ? `${v / 1000}k` : String(v)}
              />
              <Tooltip
                cursor={{ stroke: "rgba(255,255,255,0.2)" }}
                contentStyle={{
                  borderRadius: "var(--radius)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  backgroundColor: "#1e293b",
                  color: "#f8fafc",
                }}
                formatter={(value, name) => [
                  typeof value === "number" ? `$${value.toLocaleString()}` : value,
                  name,
                ]}
                labelFormatter={(label) => label}
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
                        value === "revenue"
                          ? REVENUE_COLOR
                          : value === "driverEarnings"
                            ? DRIVER_EARNINGS_COLOR
                            : COMMISSION_COLOR,
                    }}
                  >
                    {value}
                  </span>
                )}
                iconType="circle"
                iconSize={8}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                name="revenue"
                stroke={REVENUE_COLOR}
                strokeWidth={2}
                dot={{ fill: REVENUE_COLOR, r: 4 }}
                activeDot={{ r: 5, fill: REVENUE_COLOR, stroke: "#fff" }}
              />
              <Line
                type="monotone"
                dataKey="driverEarnings"
                name="driverEarnings"
                stroke={DRIVER_EARNINGS_COLOR}
                strokeWidth={2}
                dot={{ fill: DRIVER_EARNINGS_COLOR, r: 4 }}
                activeDot={{ r: 5, fill: DRIVER_EARNINGS_COLOR, stroke: "#fff" }}
              />
              <Line
                type="monotone"
                dataKey="commission"
                name="commission"
                stroke={COMMISSION_COLOR}
                strokeWidth={2}
                dot={{ fill: COMMISSION_COLOR, r: 4 }}
                activeDot={{ r: 5, fill: COMMISSION_COLOR, stroke: "#fff" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
