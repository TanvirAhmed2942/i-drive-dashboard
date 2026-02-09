"use client";


import { cn } from "@/lib/utils";
import { Sparkles, Clock, Check, Ban } from "lucide-react";

const stats = [
    {
        key: "in_progress",
        icon: Sparkles,
        label: "In Progress",
        count: "387",
        subtitle: "Currently active",
        iconClassName: "text-blue-400",
    },
    {
        key: "upcoming",
        icon: Clock,
        label: "Upcoming",
        count: "156",
        subtitle: "Scheduled rides",
        iconClassName: "text-amber-400",
    },
    {
        key: "completed",
        icon: Check,
        label: "Completed",
        count: "12,458",
        subtitle: "This month",
        iconClassName: "text-emerald-400",
    },
    {
        key: "cancelled",
        icon: Ban,
        label: "Cancelled",
        count: "234",
        subtitle: "This month",
        iconClassName: "text-red-400",
    },
] as const;

export default function RideStats() {
    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map(({ key, icon: Icon, label, count, subtitle, iconClassName }) => (
                <div
                    key={key}
                    className={cn(
                        "flex flex-col gap-3 rounded-lg border border-white/10 bg-[#10162B] p-5 shadow-sm"
                    )}
                >
                    <div className="flex items-center gap-2">
                        <Icon className={cn("size-5 shrink-0", iconClassName)} />
                        <span className={cn("text-sm font-medium", iconClassName)}>
                            {label}
                        </span>
                    </div>
                    <p className="text-2xl font-semibold tracking-tight text-white">
                        {count}
                    </p>
                    <p className="text-xs text-zinc-500">{subtitle}</p>
                </div>
            ))}
        </div>
    );
}
