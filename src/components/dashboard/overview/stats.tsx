import React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

export type StatItem = {
    label: string;
    value: string | number;
    icon: React.ReactNode;
    iconBg?: string;
};

type StatsProps = {
    items: StatItem[];
    className?: string;
};

function StatCard({
    label,
    value,
    icon,
    iconBg = "bg-[#0f2231]",
    className,
}: StatItem & { className?: string }) {
    return (
        <Card
            className={cn(
                "flex flex-col gap-4 rounded-lg border bg-background p-5 text-left shadow-sm",
                className
            )}
        >
            <CardContent className="flex flex-col gap-4 p-0">
                <div
                    className={cn(
                        "flex size-11 shrink-0 items-center justify-center rounded-lg [&_svg]:size-5 [&_svg]:text-white",
                        iconBg
                    )}
                >
                    {icon}
                </div>
                <div className="flex flex-col gap-0.5">
                    <span className="text-2xl font-bold tabular-nums text-white md:text-3xl">
                        {value}
                    </span>
                    <span className="text-sm text-muted-foreground">{label}</span>
                </div>
            </CardContent>
        </Card>
    );
}

export default function Stats({ items, className }: StatsProps) {
    return (
        <div
            className={cn(
                "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4",
                className
            )}
        >
            {items.map((item) => (
                <StatCard
                    key={item.label}
                    label={item.label}
                    value={item.value}
                    icon={item.icon}
                    iconBg={item.iconBg}
                />
            ))}
        </div>
    );
}
