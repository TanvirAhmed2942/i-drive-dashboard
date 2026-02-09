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

export type UserEngagementDataPoint = {
    day: string;
    activeUsers: number;
    newUsers: number;
};

type UserEnagementTrendsProps = {
    data?: UserEngagementDataPoint[];
    className?: string;
};

const ACTIVE_USERS_COLOR = "#2196F3"; // blue
const NEW_USERS_COLOR = "#9C27B0"; // purple

const defaultData: UserEngagementDataPoint[] = [
    { day: "Mon", activeUsers: 240, newUsers: 50 },
    { day: "Tue", activeUsers: 200, newUsers: 50 },
    { day: "Wed", activeUsers: 280, newUsers: 60 },
    { day: "Thu", activeUsers: 250, newUsers: 60 },
    { day: "Fri", activeUsers: 320, newUsers: 80 },
    { day: "Sat", activeUsers: 410, newUsers: 100 },
    { day: "Sun", activeUsers: 380, newUsers: 90 },
];

export default function UserEnagementTrends({
    data = defaultData,
    className,
}: UserEnagementTrendsProps) {
    return (
        <Card
            className={cn(
                "overflow-hidden rounded-lg border border-indigo-500/20 bg-[#121221] shadow-sm",
                className
            )}
        >
            <CardHeader className="space-y-1 px-6 pb-2">
                <CardTitle className="text-xl font-bold text-white">
                    User Engagement Trends
                </CardTitle>
                <CardDescription className="text-sm text-zinc-400">
                    Weekly active and new users overview
                </CardDescription>
            </CardHeader>
            <CardContent className="px-6 pb-6 pt-2">
                <div className="h-[280px] min-h-[280px] w-full min-w-0">
                    <ResponsiveContainer width="100%" height={280}>
                        <BarChart
                            data={data}
                            margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
                            barGap={4}
                            barCategoryGap="20%"
                        >
                            <CartesianGrid
                                strokeDasharray="3 3"
                                stroke="rgba(255,255,255,0.12)"
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
                                domain={[0, 450]}
                                ticks={[0, 100, 200, 300, 400]}
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
                                dataKey="activeUsers"
                                name="activeUsers"
                                fill={ACTIVE_USERS_COLOR}
                                radius={[5, 5, 0, 0]}
                                activeBar={{
                                    fill: ACTIVE_USERS_COLOR,
                                    stroke: "rgba(255,255,255,0.6)",
                                    strokeWidth: 1,
                                    opacity: 1,
                                    scale: 1.5,
                                }}
                            />
                            <Bar
                                dataKey="newUsers"
                                name="newUsers"
                                fill={NEW_USERS_COLOR}
                                radius={[5, 5, 0, 0]}
                                activeBar={{
                                    fill: NEW_USERS_COLOR,
                                    stroke: "rgba(255,255,255,0.6)",
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
