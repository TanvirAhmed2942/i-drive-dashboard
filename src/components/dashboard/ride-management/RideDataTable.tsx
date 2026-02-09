"use client";

import React from "react";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Check, X, Clock, Sparkles } from "lucide-react";
import FilterSearch from "@/components/common/filter/FIlterSearch";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PageLimit from "@/components/common/pagelimit/PageLimit";

export type RideStatus = "in_progress" | "upcoming" | "completed" | "cancelled";

export type Ride = {
  id: string;
  rideId: string;
  driverName: string;
  passengerName: string;
  origin: string;
  destination: string;
  distanceKm: string;
  durationMins: string;
  fare: string;
  dateTime: string;
  status: RideStatus;
};

type RideDataTableProps = {
  rides?: Ride[];
  className?: string;
};

function StatusBadge({ status }: { status: RideStatus }) {
  const config: Record<
    RideStatus,
    { className: string; icon: React.ReactNode; label: string }
  > = {
    in_progress: {
      className: "bg-blue-600 text-white",
      icon: <Sparkles className="size-3" />,
      label: "In Progress",
    },
    upcoming: {
      className: "bg-amber-500 text-white",
      icon: <Clock className="size-3" />,
      label: "Upcoming",
    },
    completed: {
      className: "bg-emerald-600 text-white",
      icon: <Check className="size-3" />,
      label: "Completed",
    },
    cancelled: {
      className: "bg-red-500/90 text-white",
      icon: <X className="size-3" />,
      label: "Cancelled",
    },
  };
  const { className, icon, label } = config[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium",
        className
      )}
    >
      {icon}
      {label}
    </span>
  );
}

const defaultRides: Ride[] = [
  {
    id: "1",
    rideId: "RI-4525",
    driverName: "Michael Chen",
    passengerName: "Sarah Johnson",
    origin: "Downtown Plaza, 5th Avenue",
    destination: "Airport Terminal 2",
    distanceKm: "18.5 km",
    durationMins: "25 mins",
    fare: "$45.00",
    dateTime: "Today, 2:30 PM",
    status: "in_progress",
  },
  {
    id: "2",
    rideId: "RI-4524",
    driverName: "Sarah Johnson",
    passengerName: "Emily Davis",
    origin: "Central Station",
    destination: "City Mall",
    distanceKm: "8.2 km",
    durationMins: "15 mins",
    fare: "$22.50",
    dateTime: "Today, 4:00 PM",
    status: "upcoming",
  },
  {
    id: "3",
    rideId: "RI-4523",
    driverName: "James Wilson",
    passengerName: "Michael Chen",
    origin: "Airport Terminal 2",
    destination: "Downtown Plaza, 5th Avenue",
    distanceKm: "18.5 km",
    durationMins: "28 mins",
    fare: "$48.20",
    dateTime: "Yesterday, 6:15 PM",
    status: "completed",
  },
  {
    id: "4",
    rideId: "RI-4522",
    driverName: "Emily Davis",
    passengerName: "James Wilson",
    origin: "Suburbs",
    destination: "Downtown Plaza, 5th Avenue",
    distanceKm: "22.0 km",
    durationMins: "32 mins",
    fare: "$52.00",
    dateTime: "Yesterday, 1:00 PM",
    status: "cancelled",
  },
];

export default function RideDataTable({
  rides = defaultRides,
  className,
}: RideDataTableProps) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [pagination, setPagination] = React.useState({
    page: 1,
    pageSize: 10,
    totalCount: rides.length,
  });

  return (
    <Card
      className={cn(
        "overflow-hidden rounded-lg border border-white/10 bg-[#10162B]",
        className
      )}
    >
      <CardHeader className="flex flex-row items-center justify-between w-full">
        <CardTitle className="w-full">
          <FilterSearch
            showFilterButton={false}
            showAddButton={false}
            placeholder="Search rides by ID, driver, or passenger..."
            searchText={searchQuery}
            setSearchText={setSearchQuery}
          />
        </CardTitle>
        <CardAction>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="h-9 rounded-lg border-2 bg-background p-1 gap-0">
              <TabsTrigger
                value="all"
                className="rounded-md px-4 py-1.5 text-sm font-medium text-zinc-400 transition-colors data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-none hover:text-zinc-300 data-[state=inactive]:bg-transparent after:hidden"
              >
                All
              </TabsTrigger>
              <TabsTrigger
                value="in_progress"
                className="rounded-md px-4 py-1.5 text-sm font-medium text-zinc-400 transition-colors data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-none hover:text-zinc-300 data-[state=inactive]:bg-transparent after:hidden"
              >
                In Progress
              </TabsTrigger>
              <TabsTrigger
                value="upcoming"
                className="rounded-md px-4 py-1.5 text-sm font-medium text-zinc-400 transition-colors data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-none hover:text-zinc-300 data-[state=inactive]:bg-transparent after:hidden"
              >
                Upcoming
              </TabsTrigger>
              <TabsTrigger
                value="completed"
                className="rounded-md px-4 py-1.5 text-sm font-medium text-zinc-400 transition-colors data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-none hover:text-zinc-300 data-[state=inactive]:bg-transparent after:hidden"
              >
                Completed
              </TabsTrigger>
              <TabsTrigger
                value="cancelled"
                className="rounded-md px-4 py-1.5 text-sm font-medium text-zinc-400 transition-colors data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-none hover:text-zinc-300 data-[state=inactive]:bg-transparent after:hidden"
              >
                Cancelled
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </CardAction>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="border-white/10 hover:bg-transparent">
              <TableHead className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Ride ID
              </TableHead>
              <TableHead className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Driver
              </TableHead>
              <TableHead className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Passenger
              </TableHead>
              <TableHead className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Route
              </TableHead>
              <TableHead className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Distance
              </TableHead>
              <TableHead className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Fare
              </TableHead>
              <TableHead className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Date/Time
              </TableHead>
              <TableHead className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Status
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rides.map((ride) => (
              <TableRow
                key={ride.id}
                className="border-white/10 text-white transition-colors hover:bg-white/5"
              >
                <TableCell className="px-4 py-3">
                  <span className="cursor-pointer text-sm font-medium text-blue-400 hover:underline">
                    #{ride.rideId}
                  </span>
                </TableCell>
                <TableCell className="px-4 py-3 text-sm text-zinc-300">
                  {ride.driverName}
                </TableCell>
                <TableCell className="px-4 py-3 text-sm text-zinc-300">
                  {ride.passengerName}
                </TableCell>
                <TableCell className="px-4 py-3">
                  <div className="flex flex-col gap-0.5 text-sm text-zinc-300">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="size-3.5 shrink-0 text-emerald-400" />
                      {ride.origin}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="size-3.5 shrink-0 text-red-400" />
                      {ride.destination}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3">
                  <div className="flex flex-col gap-0.5 text-sm text-zinc-300">
                    <span>{ride.distanceKm}</span>
                    <span className="text-xs text-zinc-500">{ride.durationMins}</span>
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3 text-sm font-medium text-zinc-300">
                  {ride.fare}
                </TableCell>
                <TableCell className="px-4 py-3 text-sm text-zinc-300">
                  {ride.dateTime}
                </TableCell>
                <TableCell className="px-4 py-3">
                  <StatusBadge status={ride.status} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow className="bg-background">
              <TableCell colSpan={8} className="px-4 py-3">
                <PageLimit
                  pagination={pagination}
                  onPaginationChange={setPagination}
                />
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </CardContent>
    </Card>
  );
}
