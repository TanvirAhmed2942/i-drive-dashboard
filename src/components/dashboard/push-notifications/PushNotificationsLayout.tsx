"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import SmallPageInfo from "@/components/common/smallPageInfo/smallPageInfo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Send, TrendingUp } from "lucide-react";

const AUDIENCE_OPTIONS = [
    { value: "all", label: "All Users" },
    { value: "drivers", label: "Drivers Only" },
    { value: "passengers", label: "Passengers Only" },
    { value: "active", label: "Active Users" },
] as const;

export default function PushNotificationsLayout() {
    const [audience, setAudience] = useState<string>("all");
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");

    return (
        <div className="space-y-6">
            <SmallPageInfo
                title="Push Notifications"
                description="Send important updates, alerts, and announcements to drivers and passengers."
            />

            <div className="grid gap-4 sm:grid-cols-2">
                <Card className="flex flex-col gap-4 rounded-lg border border-white/10 bg-[#10162B] p-5 text-left shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-sky-500/20 [&_svg]:size-5 [&_svg]:text-sky-400">
                            <Send className="text-sky-400" />
                        </div>
                        <span className="font-medium text-white">Sent Today</span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                        <span className="text-2xl font-bold tabular-nums text-white md:text-3xl">
                            1,247
                        </span>
                        <span className="text-sm text-zinc-500">Notifications</span>
                    </div>
                </Card>
                <Card className="flex flex-col gap-4 rounded-lg border border-white/10 bg-[#10162B] p-5 text-left shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-emerald-500/20 [&_svg]:size-5 [&_svg]:text-emerald-400">
                            <TrendingUp className="text-emerald-400" />
                        </div>
                        <span className="font-medium text-white">Delivery Rate</span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                        <span className="text-2xl font-bold tabular-nums text-white md:text-3xl">
                            96.8%
                        </span>
                        <span className="text-sm text-zinc-500">Successfully delivered</span>
                    </div>
                </Card>
            </div>

            <Card
                className={cn(
                    "rounded-lg border border-white/10 bg-[#10162B] shadow-sm"
                )}
            >
                <CardHeader className="px-6 pb-4 pt-6">
                    <CardTitle className="text-lg font-bold text-white">
                        Create New Notification
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-5 px-6 pb-6">
                    <div className="space-y-2">
                        <Label htmlFor="audience" className="text-white">
                            Target Audience
                        </Label>
                        <Select value={audience} onValueChange={setAudience}>
                            <SelectTrigger
                                id="audience"
                                className="w-full min-w-0 border-white/20 bg-white/5 text-white placeholder:text-zinc-500 focus-visible:ring-white/30"
                            >
                                <SelectValue placeholder="Select audience" />
                            </SelectTrigger>
                            <SelectContent className="border-white/10 bg-[#1e293b]">
                                {AUDIENCE_OPTIONS.map((opt) => (
                                    <SelectItem
                                        key={opt.value}
                                        value={opt.value}
                                        className="text-white focus:bg-white/10 focus:text-white"
                                    >
                                        {opt.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="title" className="text-white">
                            Notification Title
                        </Label>
                        <Input
                            id="title"
                            type="text"
                            placeholder="Enter notification title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="border-white/20 bg-white/5 text-white placeholder:text-zinc-500 focus-visible:ring-white/30"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="message" className="text-white">
                            Message
                        </Label>
                        <textarea
                            id="message"
                            placeholder="Enter notification message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            rows={4}
                            className={cn(
                                "border-input placeholder:text-muted-foreground focus-visible:ring-ring/50 w-full min-w-0 rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none md:text-sm",
                                "focus-visible:border-ring focus-visible:ring-[3px]",
                                "border-white/20 bg-white/5 text-white placeholder:text-zinc-500 focus-visible:ring-white/30"
                            )}
                        />
                    </div>
                    <div className="flex justify-end pt-2">
                        <Button
                            type="button"
                            className="bg-sky-600 text-white hover:bg-sky-700"
                        >
                            <Send className="mr-2 size-4" />
                            Send Now
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
