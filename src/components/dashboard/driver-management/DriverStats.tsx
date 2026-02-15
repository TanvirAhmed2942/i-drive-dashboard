"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Users, TrendingUp } from "lucide-react";

const stats = [
    {
        key: "total_driver",
        icon: Users,
        label: "Total Driver",
        count: "542",
        iconBgClassName: "bg-slate-800",
        iconClassName: "text-white",
    },
    {
        key: "active_driver",
        icon: TrendingUp,
        label: "Active Driver",
        count: "12",
        iconBgClassName: "bg-emerald-700",
        iconClassName: "text-white",
    },
] as const;

export default function DriverStats() {
    return (
        <div className="grid gap-4 sm:grid-cols-2 max-w-lg">
            {stats.map(({ key, icon: Icon, label, count, iconBgClassName, iconClassName }) => (
                <div
                    key={key}
                    className={cn(
                        "flex flex-col gap-4 rounded-lg border border-white/10 bg-[#10162B] p-5 shadow-sm"
                    )}
                >
                    <div
                        className={cn(
                            "flex size-10 shrink-0 items-center justify-center rounded-lg",
                            iconBgClassName
                        )}
                    >
                        <Icon className={cn("size-5", iconClassName)} />
                    </div>
                    <p className="text-2xl font-bold tracking-tight text-white">
                        {count}
                    </p>
                    <p className="text-sm font-medium text-white">{label}</p>
                </div>
            ))}
        </div>
    );
}
