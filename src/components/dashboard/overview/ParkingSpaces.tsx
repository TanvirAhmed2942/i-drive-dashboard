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
import { Separator } from "@/components/ui/separator";

const DOT_COLORS = {
  green: "bg-emerald-500",
  red: "bg-red-500",
  purple: "bg-purple-500",
} as const;

export type ActivityItem = {
  description: string;
  timestamp: string;
  dotColor: keyof typeof DOT_COLORS;
};

type RecentActivityProps = {
  items: ActivityItem[];
  className?: string;
};

export default function RecentActivity({ items, className }: RecentActivityProps) {
  return (
    <Card
      className={cn(
        "rounded-lg border  bg-background shadow-sm",
        className
      )}
    >
      <CardHeader className="space-y-1.5 pb-4">
        <CardTitle className="text-xl font-bold text-white">
          Recent Activity
        </CardTitle>
        <CardDescription className="text-sm text-zinc-400">
          Latest updates from the platform
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-0 px-6 pb-6 pt-0">
        {items.map((item, index) => (
          <React.Fragment key={`${item.description}-${index}`}>
            {index > 0 && (
              <Separator className="mb-4 bg-border" />
            )}
            <div className="flex gap-3 py-4 first:pt-0">
              <div
                className={cn(
                  "mt-1.5 size-2.5 shrink-0 rounded-full",
                  DOT_COLORS[item.dotColor]
                )}
                aria-hidden
              />
              <div className="min-w-0 flex-1 space-y-0.5">
                <p className="text-sm font-medium text-white">
                  {item.description}
                </p>
                <p className="pl-0 text-xs text-zinc-500">
                  {item.timestamp}
                </p>
              </div>
            </div>
          </React.Fragment>
        ))}
      </CardContent>
    </Card>
  );
}
