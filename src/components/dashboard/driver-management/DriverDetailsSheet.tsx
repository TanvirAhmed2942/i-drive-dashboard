"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Star,
  MapPin,
  Mail,
  Phone,
  Calendar,
  Car,
  DollarSign,
  FileText,
  Check,
  X,
  Ban,
  RefreshCw,
} from "lucide-react";
import type { Driver, DriverStatus } from "./DriverDataTable";

const MOCK_JOIN_DATE = "Joined Jan 15, 2024";
const MOCK_GENDER = "Male";
const MOCK_VEHICLE_TYPE = "Car, Standard";
const MOCK_PRICE_PER_HOUR = "$ 30.00";
const MOCK_RECENT_RIDES = [
  { id: "RI-4521", time: "2 hours ago", amount: "$45.20", status: "Completed" },
  { id: "RI-4512", time: "5 hours ago", amount: "$28.50", status: "Completed" },
  { id: "RI-4501", time: "1 day ago", amount: "$32.80", status: "Completed" },
];

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((s) => s[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function StatusBadge({ status }: { status: DriverStatus }) {
  const config: Record<
    DriverStatus,
    { className: string; label: string }
  > = {
    active: { className: "bg-emerald-600 text-white", label: "Active" },
    offline: { className: "bg-zinc-500/30 text-white border border-zinc-500/50", label: "Offline" },
    suspended: { className: "bg-red-500/90 text-white", label: "Suspended" },
    pending: { className: "bg-amber-500 text-white", label: "Pending" },
  };
  const { className, label } = config[status];
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        className
      )}
    >
      {label}
    </span>
  );
}

function ContactSection({ driver }: { driver: Driver }) {
  return (
    <section className="space-y-3">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
        Contact Information
      </h3>
      <ul className="space-y-2.5 text-sm text-zinc-300">
        <li className="flex items-center gap-2">
          <Mail className="size-4 shrink-0 text-zinc-500" />
          {driver.email}
        </li>
        <li className="flex items-center gap-2">
          <Phone className="size-4 shrink-0 text-zinc-500" />
          {driver.phone}
        </li>
        <li className="flex items-center gap-2">
          <span className="flex size-4 shrink-0 items-center justify-center text-zinc-500" aria-hidden>♂</span>
          {MOCK_GENDER}
        </li>
        <li className="flex items-center gap-2">
          <MapPin className="size-4 shrink-0 text-zinc-500" />
          {driver.location}
        </li>
        <li className="flex items-center gap-2">
          <Calendar className="size-4 shrink-0 text-zinc-500" />
          {MOCK_JOIN_DATE}
        </li>
      </ul>
    </section>
  );
}

function VehicleSection({
  driver,
  variant = "compact",
}: {
  driver: Driver;
  variant?: "full" | "compact";
}) {
  return (
    <section className="space-y-3">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
        Vehicle Information
      </h3>
      {variant === "full" ? (
        <div className="space-y-2 text-sm text-zinc-300">
          <div className="flex justify-between">
            <span className="text-zinc-500">Vehicle Type & Service</span>
            <span>{MOCK_VEHICLE_TYPE}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-500">Vehicle Model & Year</span>
            <span>{driver.vehicle}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-500">License Plate</span>
            <span>{driver.licensePlate}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-500">Price per Hour</span>
            <span>{MOCK_PRICE_PER_HOUR}</span>
          </div>
        </div>
      ) : (
        <div className="space-y-2 text-sm text-zinc-300">
          <div className="flex justify-between">
            <span className="text-zinc-500">Vehicle Model & Year</span>
            <span>{driver.vehicle}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-500">License Plate</span>
            <span>{driver.licensePlate}</span>
          </div>
        </div>
      )}
    </section>
  );
}

function DocumentsSection() {
  return (
    <section className="space-y-3">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
        Documents
      </h3>
      <div className="flex gap-3">
        <div className="flex flex-col items-center gap-1.5">
          <div className="flex h-20 w-28 items-center justify-center rounded border border-white/10 bg-white/5">
            <FileText className="size-8 text-zinc-500" />
          </div>
          <span className="text-xs text-zinc-500">Driver License</span>
        </div>
        <div className="flex flex-col items-center gap-1.5">
          <div className="flex h-20 w-28 items-center justify-center rounded border border-white/10 bg-white/5">
            <FileText className="size-8 text-zinc-500" />
          </div>
          <span className="text-xs text-zinc-500">Vehicle Registration</span>
        </div>
      </div>
    </section>
  );
}

function KeyMetricsSection({ driver }: { driver: Driver }) {
  return (
    <div className="grid grid-cols-3 gap-3">
      <div className="rounded-lg border border-white/10 bg-white/5 p-3 text-center">
        <Star className="mx-auto size-5 fill-amber-400 text-amber-400" />
        <p className="mt-1 text-lg font-semibold text-white">
          {driver.rating > 0 ? driver.rating.toFixed(1) : "0.0"}
        </p>
        <p className="text-xs text-zinc-500">Rating</p>
      </div>
      <div className="rounded-lg border border-white/10 bg-white/5 p-3 text-center">
        <Car className="mx-auto size-5 text-blue-400" />
        <p className="mt-1 text-lg font-semibold text-white">
          {driver.totalRides.toLocaleString()}
        </p>
        <p className="text-xs text-zinc-500">Rides</p>
      </div>
      <div className="rounded-lg border border-white/10 bg-white/5 p-3 text-center">
        <DollarSign className="mx-auto size-5 text-emerald-400" />
        <p className="mt-1 text-lg font-semibold text-white">{driver.earnings}</p>
        <p className="text-xs text-zinc-500">Earned</p>
      </div>
    </div>
  );
}

function RecentActivitySection() {
  return (
    <section className="space-y-3">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
        Recent Activity
      </h3>
      <ul className="space-y-3">
        {MOCK_RECENT_RIDES.map((ride) => (
          <li
            key={ride.id}
            className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-3"
          >
            <div>
              <p className="text-sm font-medium text-blue-400">#{ride.id}</p>
              <p className="text-xs text-zinc-500">{ride.time}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-white">{ride.amount}</p>
              <p className="text-xs text-emerald-400">{ride.status}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

type DriverDetailsSheetProps = {
  driver: Driver | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function DriverDetailsSheet({
  driver,
  open,
  onOpenChange,
}: DriverDetailsSheetProps) {
  if (!driver) return null;

  const isPending = driver.status === "pending";
  const isSuspended = driver.status === "suspended";

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="flex w-full  flex-col overflow-y-auto border-white/10 bg-[#10162B] sm:max-w-md"
      >
        <SheetHeader className="flex flex-row items-start justify-between gap-4 border-b border-white/10 pb-4">
          <SheetTitle className="text-lg font-semibold text-white">
            Driver Details
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-1 flex-col gap-6 p-4">
          {/* Profile */}
          <div className="flex items-start gap-3">
            <Avatar className="size-14 shrink-0">
              <AvatarImage src={driver.avatar ?? undefined} alt={driver.name} />
              <AvatarFallback className="bg-white/10 text-base text-white">
                {getInitials(driver.name)}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-white">{driver.name}</p>
              <p className="text-sm text-zinc-500">{driver.driverId}</p>
              <div className="mt-1.5">
                <StatusBadge status={driver.status} />
              </div>
            </div>
          </div>

          {/* Key metrics: only for non-pending */}
          {!isPending && (
            <KeyMetricsSection driver={driver} />
          )}

          <ContactSection driver={driver} />
          <VehicleSection driver={driver} variant={isPending ? "full" : "compact"} />

          {/* Documents: only for pending */}
          {isPending && <DocumentsSection />}

          {/* Recent activity: only for non-pending */}
          {!isPending && <RecentActivitySection />}
        </div>

        {/* Actions by status */}
        <div className="mt-auto flex flex-col gap-2 border-t border-white/10 p-4">
          {isPending && (
            <>
              <Button
                className="w-full gap-2 bg-blue-600 hover:bg-blue-700"
                onClick={() => onOpenChange(false)}
              >
                <Check className="size-4" />
                Approve
              </Button>
              <Button
                variant="destructive"
                className="w-full gap-2"
                onClick={() => onOpenChange(false)}
              >
                <X className="size-4" />
                Reject
              </Button>
            </>
          )}
          {(driver.status === "active" || driver.status === "offline") && (
            <Button
              variant="destructive"
              className="w-full gap-2"
              onClick={() => onOpenChange(false)}
            >
              <Ban className="size-4" />
              Suspend Driver
            </Button>
          )}
          {isSuspended && (
            <Button
              className="w-full gap-2 bg-blue-600 hover:bg-blue-700"
              onClick={() => onOpenChange(false)}
            >
              <RefreshCw className="size-4" />
              Request to Resubmit all Information
            </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
