"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { DollarSign, TrendingUp, Clock } from "lucide-react";

const stats = [
  {
    key: "total_revenue",
    icon: DollarSign,
    label: "Total Revenue",
    value: "$284,392",
    subtitle: "+15.3% this month",
    iconClassName: "text-emerald-400",
    subtitleClassName: "text-emerald-400",
  },
  {
    key: "commission",
    icon: TrendingUp,
    label: "Commission",
    value: "$56,878",
    subtitle: "20% platform fee",
    iconClassName: "text-blue-400",
    subtitleClassName: "text-zinc-500",
  },
  {
    key: "driver_earnings",
    icon: DollarSign,
    label: "Driver Earnings",
    value: "$227,514",
    subtitle: "Total payouts",
    iconClassName: "text-violet-400",
    subtitleClassName: "text-zinc-500",
  },
  // {
  //   key: "pending",
  //   icon: Clock,
  //   label: "Pending",
  //   value: "$4,256",
  //   subtitle: "Awaiting processing",
  //   iconClassName: "text-amber-400",
  //   subtitleClassName: "text-zinc-500",
  // },
] as const;

export default function PaymentStats() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map(
        ({
          key,
          icon: Icon,
          label,
          value,
          subtitle,
          iconClassName,
          subtitleClassName,
        }) => (
          <div
            key={key}
            className="flex flex-col gap-3 rounded-lg border border-white/10 bg-[#10162B] p-5 shadow-sm"
          >
            <div className="flex items-center gap-2">
              <Icon className={cn("size-5 shrink-0", iconClassName)} />
              <span className={cn("text-sm font-medium", iconClassName)}>
                {label}
              </span>
            </div>
            <p className="text-2xl font-semibold tracking-tight text-white">
              {value}
            </p>
            <p className={cn("text-xs", subtitleClassName)}>{subtitle}</p>
          </div>
        )
      )}
    </div>
  );
}
