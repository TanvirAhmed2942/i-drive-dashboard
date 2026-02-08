"use client";

import { cn } from "@/lib/utils";
import {
    Card,
    CardContent,
    CardHeader,
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

export type BookingTrendsDataPoint = {
    day: string;
    bookings: number;
};

type BookingTrendsBarchartProps = {
    data: BookingTrendsDataPoint[];
    className?: string;
};



export default function BookingTrendsBarchart({
    data,
    className,
}: BookingTrendsBarchartProps) {


    return (
        <Card className={cn("rounded-xl border bg-background", className)}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 px-6 pb-2">
                <h3 className="text-base font-bold text-card-foreground">
                    Booking Trends
                </h3>

            </CardHeader>
            <CardContent className="px-6 pb-6 pt-2">
                <div className="h-[400px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                            data={data}
                            margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
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
                                domain={[0, "auto"]}
                            />
                            <Tooltip
                                contentStyle={{
                                    borderRadius: "var(--radius)",
                                    border: "1px solid hsl(var(--border))",
                                    backgroundColor: "#e3f3f7",
                                }}
                                formatter={(value) => [value ?? 0, "bookings"]}
                                labelFormatter={(label) => `Day: ${label}`}
                            />
                            <Legend
                                wrapperStyle={{ paddingTop: "8px" }}
                                formatter={() => (
                                    <span className="text-sm text-sky-500">→ bookings</span>
                                )}
                                iconSize={0}
                            />
                            <Line
                                type="monotone"
                                dataKey="bookings"
                                stroke="rgb(14 165 233)"
                                strokeWidth={2}
                                dot={{ fill: "rgb(14 165 233)", r: 4 }}
                                activeDot={{ r: 5 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
