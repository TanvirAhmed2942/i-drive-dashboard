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
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";

export type RidesOverviewDataPoint = {
    day: string;
    active: number;
    completed: number;
};

type RidesOverviewChartProps = {
    data: RidesOverviewDataPoint[];
    className?: string;
};

/** @deprecated Use RidesOverviewDataPoint */
export type RevenueTrendsDataPoint = RidesOverviewDataPoint;

const ACTIVE_COLOR = "#38bdf8"; // light blue (sky-400)
const COMPLETED_COLOR = "#ffffff";

export default function RevenueTrendsBarchart({
    data,
    className,
}: RidesOverviewChartProps) {
    return (
        <Card
            className={cn(
                "rounded-lg border bg-background shadow-sm",
                className
            )}
        >
            <CardHeader className="space-y-1 px-6 pb-2">
                <CardTitle className="text-xl font-bold text-white">
                    Rides Overview
                </CardTitle>
                <CardDescription className="text-sm text-zinc-400">
                    Last 7 days
                </CardDescription>
            </CardHeader>
            <CardContent className="px-6 pb-6 pt-2">
                <div className="h-[280px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={data}
                            margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
                            barGap={4}
                            barCategoryGap="20%"
                        >
                            <CartesianGrid
                                strokeDasharray="3 3"
                                stroke="rgba(255,255,255,0.1)"
                                vertical={false}
                            />
                            <XAxis
                                dataKey="day"
                                tick={{ fontSize: 12, fill: "rgba(255,255,255,0.8)" }}
                                axisLine={false}
                                tickLine={false}
                            />
                            <YAxis
                                tick={{ fontSize: 12, fill: "rgba(255,255,255,0.8)" }}
                                axisLine={false}
                                tickLine={false}
                                tickFormatter={(v) => String(v)}
                                domain={[0, 1000]}
                                ticks={[0, 250, 500, 750, 1000]}
                            />
                            <Tooltip
                                cursor={false}
                                contentStyle={{
                                    borderRadius: "var(--radius)",
                                    border: "1px solid rgba(255,255,255,0.15)",
                                    backgroundColor: "#1e293b",
                                    color: "#f8fafc",
                                }}
                                formatter={(value, name) => [value ?? 0, name]}
                                labelFormatter={(label) => `Day: ${label}`}
                                itemStyle={{ color: "#f8fafc" }}
                            />
                            <Legend
                                wrapperStyle={{ paddingTop: "12px" }}
                                align="center"
                                formatter={(value) => (
                                    <span className="text-sm text-white">{value}</span>
                                )}
                                iconType="square"
                                iconSize={10}
                            />
                            <Bar
                                dataKey="active"
                                name="Active"
                                fill={ACTIVE_COLOR}
                                radius={[5, 5, 0, 0]}
                                activeBar={{
                                    fill: ACTIVE_COLOR,
                                    stroke: "rgba(255,255,255,0.6)",
                                    strokeWidth: 1,
                                    opacity: 1,
                                    scale: 1.5,
                                }}
                            />
                            <Bar
                                dataKey="completed"
                                name="Completed"
                                fill={COMPLETED_COLOR}
                                radius={[5, 5, 0, 0]}
                                activeBar={{
                                    fill: COMPLETED_COLOR,
                                    stroke: "rgba(255,255,255,0.8)",
                                    strokeWidth: 1,
                                    opacity: 1,
                                    scale: 1.5,
                                }}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
