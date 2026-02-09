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
import { Star, MapPin, Check, X } from "lucide-react";
import FilterSearch from "@/components/common/filter/FIlterSearch";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PageLimit from "@/components/common/pagelimit/PageLimit";
import { DriverDetailsSheet } from "./DriverDetailsSheet";

export type DriverStatus = "active" | "offline" | "suspended" | "pending";

export type Driver = {
  id: string;
  name: string;
  driverId: string;
  avatar?: string | null;
  email: string;
  phone: string;
  vehicle: string;
  licensePlate: string;
  rating: number;
  totalRides: number;
  earnings: string;
  location: string;
  status: DriverStatus;
};

type DriverDataTableProps = {
  drivers?: Driver[];
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

function StatusBadge({ status }: { status: DriverStatus }) {
  const config = {
    active: {
      className: "bg-emerald-600 text-white",
      icon: <Check className="size-3" />,
    },
    offline: {
      className: "bg-zinc-500/20 text-zinc-400",
      icon: null,
    },
    suspended: {
      className: "bg-red-500/90 text-white",
      icon: <X className="size-3" />,
    },
    pending: {
      className: "bg-amber-500 text-white",
      icon: null,
    },
  };
  const { className, icon } = config[status];
  const label = status.charAt(0).toUpperCase() + status.slice(1);
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium",
        className
      )}
    >
      {icon}
      {label}
    </span>
  );
}

const defaultDrivers: Driver[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    driverId: "DR-1000",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    vehicle: "Honda Accord 2023",
    licensePlate: "XYZ-5678",
    rating: 4.9,
    totalRides: 1250,
    earnings: "$42,180",
    location: "Midtown",
    status: "active",
  },
  {
    id: "2",
    name: "Michael Chen",
    driverId: "DR-1001",
    email: "michael.chen@email.com",
    phone: "+1 (555) 234-5678",
    vehicle: "Toyota Camry 2022",
    licensePlate: "ABC-1234",
    rating: 4.9,
    totalRides: 1247,
    earnings: "$45,230",
    location: "Downtown",
    status: "offline",
  },
  {
    id: "3",
    name: "Emily Davis",
    driverId: "DR-1002",
    email: "emily.davis@email.com",
    phone: "+1 (555) 345-6789",
    vehicle: "Tesla Model 3 2024",
    licensePlate: "EV-9000",
    rating: 0,
    totalRides: 0,
    earnings: "$0",
    location: "Airport Zone",
    status: "pending",
  },
  {
    id: "4",
    name: "James Wilson",
    driverId: "DR-1003",
    email: "james.wilson@email.com",
    phone: "+1 (555) 456-7890",
    vehicle: "Ford Fusion 2021",
    licensePlate: "DEF-5678",
    rating: 4.2,
    totalRides: 890,
    earnings: "$28,450",
    location: "Suburbs",
    status: "suspended",
  },
];

export default function DriverDataTable({
  drivers = defaultDrivers,
  className,
}: DriverDataTableProps) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [pagination, setPagination] = React.useState({ page: 1, pageSize: 10, totalCount: drivers.length });
  const [selectedDriver, setSelectedDriver] = React.useState<Driver | null>(null);
  const [sheetOpen, setSheetOpen] = React.useState(false);

  const handleRowClick = (driver: Driver) => {
    setSelectedDriver(driver);
    setSheetOpen(true);
  };

  const handleSheetOpenChange = (open: boolean) => {
    setSheetOpen(open);
    if (!open) setSelectedDriver(null);
  };

  return (
    <>
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
            placeholder="Search drivers by name, ID, or vehicle..."
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
                value="offline"
                className="rounded-md px-4 py-1.5 text-sm font-medium text-zinc-400 transition-colors data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-none hover:text-zinc-300 data-[state=inactive]:bg-transparent after:hidden"
              >
                Offline
              </TabsTrigger>
              <TabsTrigger
                value="suspended"
                className="rounded-md px-4 py-1.5 text-sm font-medium text-zinc-400 transition-colors data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-none hover:text-zinc-300 data-[state=inactive]:bg-transparent after:hidden"
              >
                Suspended
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
                Driver
              </TableHead>
              <TableHead className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Contact
              </TableHead>
              <TableHead className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Vehicle
              </TableHead>
              <TableHead className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Rating
              </TableHead>
              <TableHead className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Total Rides
              </TableHead>
              <TableHead className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Earnings
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
            {drivers.map((driver) => (
              <TableRow
                key={driver.id}
                role="button"
                tabIndex={0}
                onClick={() => handleRowClick(driver)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleRowClick(driver);
                  }
                }}
                className="cursor-pointer border-white/10 text-white transition-colors hover:bg-white/5"
              >
                <TableCell className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="size-10 shrink-0">
                      <AvatarImage
                        src={driver.avatar ?? undefined}
                        alt={driver.name}
                      />
                      <AvatarFallback className="bg-white/10 text-sm text-white">
                        {getInitials(driver.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-medium text-white">
                        {driver.name}
                      </span>
                      <span className="text-xs text-zinc-500">
                        {driver.driverId}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3">
                  <div className="flex flex-col">
                    <span className="text-sm text-zinc-300">
                      {driver.email}
                    </span>
                    <span className="text-xs text-zinc-500">
                      {driver.phone}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3">
                  <div className="flex flex-col">
                    <span className="text-sm text-zinc-300">
                      {driver.vehicle}
                    </span>
                    <span className="text-xs text-zinc-500">
                      {driver.licensePlate}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    <Star className="size-4 fill-amber-400 text-amber-400" />
                    <span className="text-sm text-zinc-300">
                      {driver.rating > 0 ? driver.rating.toFixed(1) : "0.0"}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3 text-sm text-zinc-300">
                  {driver.totalRides.toLocaleString()}
                </TableCell>
                <TableCell className="px-4 py-3 text-sm font-medium text-zinc-300">
                  {driver.earnings}
                </TableCell>
                <TableCell className="px-4 py-3">
                  <div className="flex items-center gap-1.5 text-sm text-zinc-300">
                    <MapPin className="size-4 shrink-0 text-zinc-500" />
                    {driver.location}
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3">
                  <StatusBadge status={driver.status} />
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
    <DriverDetailsSheet
      driver={selectedDriver}
      open={sheetOpen}
      onOpenChange={handleSheetOpenChange}
    />
    </>
  );
}
