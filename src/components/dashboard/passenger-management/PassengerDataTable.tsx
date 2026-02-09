"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { Star, MapPin } from "lucide-react";
import FilterSearch from "@/components/common/filter/FIlterSearch";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PageLimit from "@/components/common/pagelimit/PageLimit";

export type PassengerStatus = "active" | "blocked" | "inactive";

export type Passenger = {
  id: string;
  name: string;
  passengerId: string;
  avatar?: string | null;
  email: string;
  phone: string;
  joined: string;
  rating: number;
  totalRides: number;
  totalSpent: string;
  location: string;
  status: PassengerStatus;
};

type PassengerDataTableProps = {
  passengers?: Passenger[];
  className?: string;
};

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((s) => s[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function StatusBadge({ status }: { status: PassengerStatus }) {
  const config: Record<PassengerStatus, { className: string }> = {
    active: { className: "bg-emerald-600 text-white" },
    blocked: { className: "bg-red-500/90 text-white" },
    inactive: { className: "bg-zinc-500/30 text-white" },
  };
  const { className } = config[status];
  const label = status.charAt(0).toUpperCase() + status.slice(1);
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

const defaultPassengers: Passenger[] = [
  {
    id: "1",
    name: "Michael Chen",
    passengerId: "DR-1001",
    email: "michael.chen@email.com",
    phone: "+1 (555) 234-5678",
    joined: "5 Dec, 2025",
    rating: 4.9,
    totalRides: 1247,
    totalSpent: "$45,230",
    location: "Downtown",
    status: "active",
  },
  {
    id: "2",
    name: "Michael Chen",
    passengerId: "DR-1001",
    email: "michael.chen@email.com",
    phone: "+1 (555) 234-5678",
    joined: "5 Dec, 2025",
    rating: 4.9,
    totalRides: 1247,
    totalSpent: "$45,230",
    location: "Downtown",
    status: "blocked",
  },
  {
    id: "3",
    name: "Michael Chen",
    passengerId: "DR-1001",
    email: "michael.chen@email.com",
    phone: "+1 (555) 234-5678",
    joined: "5 Dec, 2025",
    rating: 4.9,
    totalRides: 1247,
    totalSpent: "$45,230",
    location: "Downtown",
    status: "active",
  },
  {
    id: "4",
    name: "Michael Chen",
    passengerId: "DR-1001",
    email: "michael.chen@email.com",
    phone: "+1 (555) 234-5678",
    joined: "5 Dec, 2025",
    rating: 4.9,
    totalRides: 1247,
    totalSpent: "$45,230",
    location: "Downtown",
    status: "inactive",
  },
  {
    id: "5",
    name: "Michael Chen",
    passengerId: "DR-1001",
    email: "michael.chen@email.com",
    phone: "+1 (555) 234-5678",
    joined: "5 Dec, 2025",
    rating: 4.9,
    totalRides: 1247,
    totalSpent: "$45,230",
    location: "Downtown",
    status: "active",
  },
  {
    id: "6",
    name: "Michael Chen",
    passengerId: "DR-1001",
    email: "michael.chen@email.com",
    phone: "+1 (555) 234-5678",
    joined: "5 Dec, 2025",
    rating: 4.9,
    totalRides: 1247,
    totalSpent: "$45,230",
    location: "Downtown",
    status: "blocked",
  },
  {
    id: "7",
    name: "Michael Chen",
    passengerId: "DR-1001",
    email: "michael.chen@email.com",
    phone: "+1 (555) 234-5678",
    joined: "5 Dec, 2025",
    rating: 4.9,
    totalRides: 1247,
    totalSpent: "$45,230",
    location: "Downtown",
    status: "inactive",
  },
  {
    id: "8",
    name: "Michael Chen",
    passengerId: "DR-1001",
    email: "michael.chen@email.com",
    phone: "+1 (555) 234-5678",
    joined: "5 Dec, 2025",
    rating: 4.9,
    totalRides: 1247,
    totalSpent: "$45,230",
    location: "Downtown",
    status: "active",
  },
  {
    id: "9",
    name: "Michael Chen",
    passengerId: "DR-1001",
    email: "michael.chen@email.com",
    phone: "+1 (555) 234-5678",
    joined: "5 Dec, 2025",
    rating: 4.9,
    totalRides: 1247,
    totalSpent: "$45,230",
    location: "Downtown",
    status: "blocked",
  },
];

export default function PassengerDataTable({
  passengers = defaultPassengers,
  className,
}: PassengerDataTableProps) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [pagination, setPagination] = React.useState({ page: 1, pageSize: 10, totalCount: passengers.length });
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
            placeholder="Search passengers by name, ID, or contact..."
            searchText={searchQuery}
            setSearchText={setSearchQuery}
          />
        </CardTitle>
        <CardAction>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="h-9 rounded-lg border-2  bg-background p-1 gap-0">
              <TabsTrigger
                value="all"
                className="rounded-md px-4 py-1.5 text-sm font-medium text-zinc-400 transition-colors data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-none hover:text-zinc-300 data-[state=inactive]:bg-transparent after:hidden"
              >
                All
              </TabsTrigger>
              <TabsTrigger
                value="active"
                className="rounded-md px-4 py-1.5 text-sm font-medium text-zinc-400 transition-colors data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-none hover:text-zinc-300 data-[state=inactive]:bg-transparent after:hidden"
              >
                Active
              </TabsTrigger>
              <TabsTrigger
                value="blocked"
                className="rounded-md px-4 py-1.5 text-sm font-medium text-zinc-400 transition-colors data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-none hover:text-zinc-300 data-[state=inactive]:bg-transparent after:hidden"
              >
                Blocked
              </TabsTrigger>
              <TabsTrigger
                value="inactive"
                className="rounded-md px-4 py-1.5 text-sm font-medium text-zinc-400 transition-colors data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-none hover:text-zinc-300 data-[state=inactive]:bg-transparent after:hidden"
              >
                Inactive
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
                Passenger
              </TableHead>
              <TableHead className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Contact
              </TableHead>
              <TableHead className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Joined
              </TableHead>
              <TableHead className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Rating
              </TableHead>
              <TableHead className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Total Rides
              </TableHead>
              <TableHead className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Total Spent
              </TableHead>
              <TableHead className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Location
              </TableHead>
              <TableHead className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Status
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {passengers.map((passenger) => (
              <TableRow
                key={passenger.id}
                className="border-white/10 text-white transition-colors hover:bg-white/5"
              >
                <TableCell className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="size-10 shrink-0">
                      <AvatarImage
                        src={passenger.avatar ?? undefined}
                        alt={passenger.name}
                      />
                      <AvatarFallback className="bg-white/10 text-sm text-white">
                        {getInitials(passenger.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-medium text-white">
                        {passenger.name}
                      </span>
                      <span className="text-xs text-zinc-500">
                        {passenger.passengerId}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3">
                  <div className="flex flex-col">
                    <span className="text-sm text-zinc-300">
                      {passenger.email}
                    </span>
                    <span className="text-xs text-zinc-500">
                      {passenger.phone}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3 text-sm text-zinc-300">
                  {passenger.joined}
                </TableCell>
                <TableCell className="px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    <Star className="size-4 fill-amber-400 text-amber-400" />
                    <span className="text-sm text-zinc-300">
                      {passenger.rating > 0 ? passenger.rating.toFixed(1) : "0.0"}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3 text-sm text-zinc-300">
                  {passenger.totalRides.toLocaleString()}
                </TableCell>
                <TableCell className="px-4 py-3 text-sm font-medium text-zinc-300">
                  {passenger.totalSpent}
                </TableCell>
                <TableCell className="px-4 py-3">
                  <div className="flex items-center gap-1.5 text-sm text-zinc-300">
                    <MapPin className="size-4 shrink-0 text-zinc-500" />
                    {passenger.location}
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3">
                  <StatusBadge status={passenger.status} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter >
            <TableRow className="bg-background">
              <TableCell colSpan={8} className="px-4 py-3">
                <PageLimit pagination={pagination} onPaginationChange={setPagination} />
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </CardContent>
    </Card>
  );
}
