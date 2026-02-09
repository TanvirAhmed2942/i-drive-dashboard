"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { TrendingUp, Calendar } from "lucide-react";

const stats = [
    {
        key: "total_revenue",
        icon: TrendingUp,
        label: "Total Revenue",
        value: "$284,392",
        iconClassName: "text-blue-400",
    },
    {
        key: "total_rides",
        icon: Calendar,
        label: "Total Rides",
        value: "12,458",
        iconClassName: "text-violet-400",
    },
    {
        key: "avg_ride_value",
        icon: TrendingUp,
        label: "Avg Ride Value",
        value: "$35.40",
        iconClassName: "text-amber-400",
    },
] as const;

export default function AnalyticsStats() {
    return (
        <div className="grid gap-4 sm:grid-cols-3">
            {stats.map(({ key, icon: Icon, label, value, iconClassName }) => (
                <div
                    key={key}
                    className={cn(
                        "flex flex-col gap-3 rounded-lg border border-cyan-500/30 bg-[#10162B] p-5 shadow-sm"
                    )}
                >
                    <div className="flex items-center gap-2">
                        <Icon className={cn("size-5 shrink-0", iconClassName)} />
                        <span className={cn("text-sm font-semibold", iconClassName)}>
                            {label}
                        </span>
                    </div>
                    <p className="text-2xl font-bold tracking-tight text-white">
                        {value}
                    </p>
                </div>
            ))}
        </div>
    );
}
