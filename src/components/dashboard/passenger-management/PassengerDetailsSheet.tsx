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
  Ban,
  UserCheck,
  CreditCard,
  AlertCircle,
  Lock,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Passenger, PassengerStatus } from "./PassengerDataTable";

const MOCK_GENDER = "Male";
const MOCK_JOIN_LABEL = "Joined Jan 15, 2024";
const MOCK_RECENT_RIDES = [
  { id: "RI-4521", driverName: "Michael Chen", amount: "$45.20", time: "1 day ago" },
  { id: "RI-4512", driverName: "Sarah Johnson", amount: "$28.50", time: "2 days ago" },
  { id: "RI-4501", driverName: "James Wilson", amount: "$32.80", time: "3 days ago" },
];

const MOCK_REPORTED_MESSAGES = [
  { from: "Alex", time: "2 days ago", message: "Sent offensive or threatening messages" },
  { from: "Alex", time: "2 days ago", message: "Bullying other attendees" },
  { from: "Alex", time: "2 days ago", message: "Fraudulent behaviour / fake claims" },
  { from: "Alex", time: "2 days ago", message: "Disruptive behaviour in group chat or event" },
];
const REPORT_COUNT = MOCK_REPORTED_MESSAGES.length;

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((s) => s[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function StatusBadge({ status }: { status: PassengerStatus }) {
  const config: Record<
    PassengerStatus,
    { className: string; label: string }
  > = {
    active: { className: "bg-emerald-600 text-white", label: "Active" },
    inactive: {
      className: "bg-zinc-500/30 text-white border border-zinc-500/50",
      label: "Inactive",
    },
    blocked: { className: "bg-red-500/90 text-white", label: "Blocked" },
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

function ContactSection({ passenger }: { passenger: Passenger }) {
  return (
    <section className="space-y-3">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
        Contact Information
      </h3>
      <ul className="space-y-2.5 text-sm text-zinc-300">
        <li className="flex items-center gap-2">
          <Mail className="size-4 shrink-0 text-zinc-500" />
          {passenger.email}
        </li>
        <li className="flex items-center gap-2">
          <Phone className="size-4 shrink-0 text-zinc-500" />
          {passenger.phone}
        </li>
        <li className="flex items-center gap-2">
          <span
            className="flex size-4 shrink-0 items-center justify-center text-zinc-500"
            aria-hidden
          >
            ♂
          </span>
          {MOCK_GENDER}
        </li>
        <li className="flex items-center gap-2">
          <MapPin className="size-4 shrink-0 text-zinc-500" />
          {passenger.location}
        </li>
        <li className="flex items-center gap-2">
          <Calendar className="size-4 shrink-0 text-zinc-500" />
          {MOCK_JOIN_LABEL}
        </li>
      </ul>
    </section>
  );
}

function KeyMetricsSection({ passenger }: { passenger: Passenger }) {
  return (
    <div className="grid grid-cols-3 gap-3">
      <div className="rounded-lg border border-white/10 bg-white/5 p-3 text-center">
        <Star className="mx-auto size-5 fill-amber-400 text-amber-400" />
        <p className="mt-1 text-lg font-semibold text-white">
          {passenger.rating > 0 ? passenger.rating.toFixed(1) : "0.0"}
        </p>
        <p className="text-xs text-zinc-500">Rating</p>
      </div>
      <div className="rounded-lg border border-white/10 bg-white/5 p-3 text-center">
        <Car className="mx-auto size-5 text-blue-400" />
        <p className="mt-1 text-lg font-semibold text-white">
          {passenger.totalRides.toLocaleString()}
        </p>
        <p className="text-xs text-zinc-500">Rides</p>
      </div>
      <div className="rounded-lg border border-white/10 bg-white/5 p-3 text-center">
        <DollarSign className="mx-auto size-5 text-emerald-400" />
        <p className="mt-1 text-lg font-semibold text-white">
          {passenger.totalSpent}
        </p>
        <p className="text-xs text-zinc-500">Spent</p>
      </div>
    </div>
  );
}

function PaymentMethodsSection() {
  return (
    <section className="space-y-3">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
        Payment Methods
      </h3>
      <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-3 py-2.5">
        <div className="flex items-center gap-2">
          <CreditCard className="size-5 text-blue-400" />
          <span className="text-sm font-medium text-zinc-300">stripe</span>
          <span className="text-sm text-zinc-500">**** 4242</span>
        </div>
        <span className="rounded-full bg-emerald-600/20 px-2 py-0.5 text-xs font-medium text-emerald-400">
          Default
        </span>
      </div>
    </section>
  );
}

function RecentRidesSection({ withScrollArea = false }: { withScrollArea?: boolean }) {
  const content = (
    <ul className="space-y-3 pr-2">
      {MOCK_RECENT_RIDES.map((ride) => (
        <li
          key={ride.id}
          className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-3"
        >
          <div>
            <p className="text-sm font-medium text-blue-400">#{ride.id}</p>
            <p className="text-xs text-zinc-500">
              Driver: {ride.driverName}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-white">{ride.amount}</p>
            <p className="text-xs text-zinc-500">{ride.time}</p>
          </div>
        </li>
      ))}
    </ul>
  );
  return (
    <section className="flex flex-col space-y-3">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
        Recent Rides
      </h3>
      {withScrollArea ? (
        <ScrollArea className="h-[180px] w-full rounded-md border border-white/10 p-2">
          {content}
        </ScrollArea>
      ) : (
        content
      )}
    </section>
  );
}

function ReportedMessagePreviewSection() {
  return (
    <section className="flex flex-col space-y-3">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
        Reported Message Preview
      </h3>
      <div className="flex items-center gap-2 text-sm text-red-400">
        <AlertCircle className="size-4 shrink-0" />
        <span>{REPORT_COUNT} Report received from passenger</span>
      </div>
      <div className="flex items-center gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-sm text-amber-200">
        <Lock className="size-4 shrink-0" />
        <span>Only the last 5 reported messages are shown.</span>
      </div>
      <ScrollArea className="h-[180px] w-full rounded-md border border-white/10 p-2">
        <div className="space-y-3 pr-2">
          {MOCK_REPORTED_MESSAGES.map((report, i) => (
            <div key={i} className="space-y-1">
              <p className="text-xs text-zinc-500">
                From {report.from} | {report.time}
              </p>
              <div className="rounded-md bg-red-500/20 px-3 py-2 text-sm text-red-200">
                {report.message}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </section>
  );
}

type PassengerDetailsSheetProps = {
  passenger: Passenger | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function PassengerDetailsSheet({
  passenger,
  open,
  onOpenChange,
}: PassengerDetailsSheetProps) {
  if (!passenger) return null;

  const isBlocked = passenger.status === "blocked";

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="flex w-full flex-col overflow-y-auto border-white/10 bg-[#10162B] sm:max-w-xl"
      >
        <SheetHeader className="flex flex-row items-start justify-between gap-4 border-b border-white/10 pb-4">
          <SheetTitle className="text-lg font-semibold text-white">
            Passenger Details
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-1 flex-col gap-6 px-4 py-4">
          {/* Profile */}
          <div className="flex items-start gap-3">
            <Avatar className="size-14 shrink-0">
              <AvatarImage
                src={passenger.avatar ?? undefined}
                alt={passenger.name}
              />
              <AvatarFallback className="bg-white/10 text-base text-white">
                {getInitials(passenger.name)}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-white">{passenger.name}</p>
              <p className="text-sm text-zinc-500">{passenger.passengerId}</p>
              <div className="mt-1.5">
                <StatusBadge status={passenger.status} />
              </div>
            </div>
          </div>

          <KeyMetricsSection passenger={passenger} />
          <ContactSection passenger={passenger} />
          <PaymentMethodsSection />

          {/* Active/inactive: column layout - Recent Rides then Reported Message Preview with ScrollArea */}
          {(passenger.status === "active" || passenger.status === "inactive") && (
            <div className="flex flex-col gap-4">
              <RecentRidesSection withScrollArea />
              <ReportedMessagePreviewSection />
            </div>
          )}

          {/* Blocked: single-column Recent Rides only */}
          {passenger.status === "blocked" && <RecentRidesSection />}
        </div>

        {/* Action by status */}
        <div className="mt-auto border-t border-white/10 py-4 px-4">
          {isBlocked ? (
            <Button
              variant='outline'
              className="w-full bg-blue-500/10 border-blue-500 text-blue-500 hover:bg-blue-500/20 hover:text-blue-500/80 gap-2"
              onClick={() => onOpenChange(false)}
            >
              <UserCheck className="size-4" />
              Unblock Passenger
            </Button>
          ) : (
            <Button
              variant='outline'
              className="w-full bg-red-500/10 border-red-500 text-red-500 hover:bg-red-500/20 hover:text-red-500/80 gap-2"
              onClick={() => onOpenChange(false)}
            >
              <Ban className="size-4" />
              Block Passenger
            </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
