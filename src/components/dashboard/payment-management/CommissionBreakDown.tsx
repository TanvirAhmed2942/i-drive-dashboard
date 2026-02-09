"use client";

import React from "react";
import { cn } from "@/lib/utils";

const cards = [
  {
    key: "platform_fee",
    title: "Platform Fee",
    value: "40%",
    subtitle: "Standard commission rate",
    subtitleClassName: "text-zinc-500",
  },
  {
    key: "average_ride_value",
    title: "Average Ride Value",
    value: "$35.40",
    subtitle: "This month",
    subtitleClassName: "text-zinc-500",
  },
  {
    key: "payment_success_rate",
    title: "Payment Success Rate",
    value: "98.7%",
    subtitle: "This month vs last month",
    subtitleClassName: "text-emerald-400",
  },
] as const;

export default function CommissionBreakDown() {
  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold text-white">
        Commission Breakdown
      </h2>
      <div className="grid gap-4 sm:grid-cols-3">
        {cards.map(({ key, title, value, subtitle, subtitleClassName }) => (
          <div
            key={key}
            className="flex flex-col gap-3 rounded-lg border border-white/10 bg-[#10162B] p-5 shadow-sm"
          >
            <p className="text-sm font-medium text-zinc-400">{title}</p>
            <p className="text-2xl font-semibold tracking-tight text-white">
              {value}
            </p>
            <p className={cn("text-xs", subtitleClassName)}>{subtitle}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
