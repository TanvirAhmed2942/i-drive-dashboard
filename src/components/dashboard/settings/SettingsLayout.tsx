"use client";

import React from "react";
import { cn } from "@/lib/utils";
import SmallPageInfo from "@/components/common/smallPageInfo/smallPageInfo";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DollarSign, Globe, Settings } from "lucide-react";

function Toggle({
  checked,
  onCheckedChange,
  "aria-label": ariaLabel,
}: {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  "aria-label"?: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      onClick={() => onCheckedChange(!checked)}
      className={cn(
        "relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#10162B]",
        checked ? "bg-blue-600" : "bg-zinc-600"
      )}
    >
      <span
        className={cn(
          "pointer-events-none inline-block size-5 transform rounded-full bg-white shadow ring-0 transition-transform",
          checked ? "translate-x-5" : "translate-x-0.5"
        )}
      />
    </button>
  );
}

const inputClassName =
  "h-9 w-full rounded-md border border-white/20 bg-white/5 text-zinc-300 placeholder:text-zinc-500 focus-visible:border-blue-500/50 focus-visible:ring-blue-500/20";

export default function SettingsLayout() {
  const [maintenanceMode, setMaintenanceMode] = React.useState(false);
  const [emailNotifications, setEmailNotifications] = React.useState(false);

  return (
    <div className="space-y-4">
      <SmallPageInfo
        title="Settings"
        description="Manage your settings and their information."
      />

      <Card className="rounded-lg border border-white/10 bg-[#10162B] px-6 py-5">
        <CardHeader className="space-y-1 pb-4">
          <CardTitle className="flex items-center gap-2 text-lg font-semibold text-white">
            <DollarSign className="size-5 text-blue-400" />
            Pricing Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-zinc-300">
              Min Base Fare per Trip for Passenger
            </Label>
            <Input
              type="text"
              defaultValue="$8.00"
              className={inputClassName}
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium text-zinc-300">
              Driver Rate (%)
            </Label>
            <Input
              type="text"
              defaultValue="60"
              className={inputClassName}
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium text-zinc-300">
              Commission Rate (%)
            </Label>
            <Input
              type="text"
              defaultValue="40"
              className={inputClassName}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-lg border border-white/10 bg-[#10162B] px-6 py-5">
        <CardHeader className="space-y-1 pb-4">
          <CardTitle className="flex items-center gap-2 text-lg font-semibold text-white">
            <Globe className="size-5 text-emerald-400" />
            Regional Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-zinc-300">
              Default Currency
            </Label>
            <Select defaultValue="usd">
              <SelectTrigger
                className={cn(inputClassName, "w-full justify-between")}
              >
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent className="border-white/10 bg-[#1e293b]">
                <SelectItem value="usd" className="text-zinc-300 focus:bg-white/10">
                  USD - US Dollar
                </SelectItem>
                <SelectItem value="eur" className="text-zinc-300 focus:bg-white/10">
                  EUR - Euro
                </SelectItem>
                <SelectItem value="gbp" className="text-zinc-300 focus:bg-white/10">
                  GBP - British Pound
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium text-zinc-300">
              Distance Unit
            </Label>
            <Select defaultValue="km">
              <SelectTrigger
                className={cn(inputClassName, "w-full justify-between")}
              >
                <SelectValue placeholder="Select unit" />
              </SelectTrigger>
              <SelectContent className="border-white/10 bg-[#1e293b]">
                <SelectItem value="km" className="text-zinc-300 focus:bg-white/10">
                  Kilometers
                </SelectItem>
                <SelectItem value="mi" className="text-zinc-300 focus:bg-white/10">
                  Miles
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-lg border border-white/10 bg-[#10162B] px-6 py-5">
        <CardHeader className="space-y-1 pb-4">
          <CardTitle className="flex items-center gap-2 text-lg font-semibold text-white">
            <Settings className="size-5 text-amber-400" />
            General Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <Label className="text-sm font-medium text-zinc-300">
                Maintenance Mode
              </Label>
              <p className="mt-0.5 text-xs text-zinc-500">
                Temporarily disable app access
              </p>
            </div>
            <Toggle
              checked={maintenanceMode}
              onCheckedChange={setMaintenanceMode}
              aria-label="Maintenance mode"
            />
          </div>
          <div className="flex items-center justify-between gap-4">
            <div>
              <Label className="text-sm font-medium text-zinc-300">
                Email Notifications
              </Label>
              <p className="mt-0.5 text-xs text-zinc-500">
                Admin alert notifications
              </p>
            </div>
            <Toggle
              checked={emailNotifications}
              onCheckedChange={setEmailNotifications}
              aria-label="Email notifications"
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button className="bg-blue-600 hover:bg-blue-700">
          Save Changes
        </Button>
      </div>
    </div>
  );
}
