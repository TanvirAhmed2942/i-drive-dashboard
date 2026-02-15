"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { FileText, CheckCircle, Clock } from "lucide-react";

const stats = [
  {
    key: "total_records",
    icon: FileText,
    label: "Total Records",
    value: "8",
    subtitle: "Tax year 2025",
    iconClassName: "text-blue-400",
  },
  {
    key: "generated",
    icon: CheckCircle,
    label: "Generated",
    value: "4",
    subtitle: "Ready to send",
    iconClassName: "text-emerald-400",
  },
  {
    key: "pending",
    icon: Clock,
    label: "Pending",
    value: "2",
    subtitle: "In processing",
    iconClassName: "text-amber-400",
  },
  {
    key: "total_earnings",
    icon: FileText,
    label: "Total Earnings",
    value: "$521k",
    subtitle: "Reported income",
    iconClassName: "text-blue-400",
  },
] as const;

export default function DocumentStats() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map(({ key, icon: Icon, label, value, subtitle, iconClassName }) => (
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
          <p className="text-xs text-zinc-500">{subtitle}</p>
        </div>
      ))}
    </div>
  );
}
