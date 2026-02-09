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
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check, X, Clock } from "lucide-react";
import FilterSearch from "@/components/common/filter/FIlterSearch";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PageLimit from "@/components/common/pagelimit/PageLimit";

export type PaymentStatus = "completed" | "pending" | "failed";

export type Payment = {
  id: string;
  paymentId: string;
  rideId: string;
  driverName: string;
  passengerName: string;
  totalAmount: string;
  commission: string;
  driverEarning: string;
  method: string;
  dateTime: string;
  status: PaymentStatus;
};

type PaymentDataTableProps = {
  payments?: Payment[];
  className?: string;
};

function StatusBadge({ status }: { status: PaymentStatus }) {
  const config: Record<
    PaymentStatus,
    { className: string; icon: React.ReactNode; label: string }
  > = {
    completed: {
      className: "bg-emerald-600 text-white",
      icon: <Check className="size-3" />,
      label: "Completed",
    },
    pending: {
      className: "bg-amber-500 text-white",
      icon: <Clock className="size-3" />,
      label: "Pending",
    },
    failed: {
      className: "bg-red-500/90 text-white",
      icon: <X className="size-3" />,
      label: "Failed",
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

const defaultPayments: Payment[] = [
  {
    id: "1",
    paymentId: "PAY-4525",
    rideId: "RI-4525",
    driverName: "Michael Chen",
    passengerName: "Sarah Johnson",
    totalAmount: "$45.20",
    commission: "$9.04",
    driverEarning: "$36.16",
    method: "Stripe",
    dateTime: "Today, 2:30 PM",
    status: "completed",
  },
  {
    id: "2",
    paymentId: "PAY-4525",
    rideId: "RI-4525",
    driverName: "Michael Chen",
    passengerName: "Sarah Johnson",
    totalAmount: "$45.20",
    commission: "$9.04",
    driverEarning: "$36.16",
    method: "Stripe",
    dateTime: "Today, 2:30 PM",
    status: "pending",
  },
  {
    id: "3",
    paymentId: "PAY-4525",
    rideId: "RI-4525",
    driverName: "Michael Chen",
    passengerName: "Sarah Johnson",
    totalAmount: "$45.20",
    commission: "$9.04",
    driverEarning: "$36.16",
    method: "Stripe",
    dateTime: "Today, 2:30 PM",
    status: "completed",
  },
  {
    id: "4",
    paymentId: "PAY-4525",
    rideId: "RI-4525",
    driverName: "Michael Chen",
    passengerName: "Sarah Johnson",
    totalAmount: "$45.20",
    commission: "$9.04",
    driverEarning: "$36.16",
    method: "Stripe",
    dateTime: "Today, 2:30 PM",
    status: "failed",
  },
];

export default function PaymentDataTable({
  payments = defaultPayments,
  className,
}: PaymentDataTableProps) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [pagination, setPagination] = React.useState({
    page: 1,
    pageSize: 10,
    totalCount: payments.length,
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
            placeholder="Search payments by ID, ride, or method..."
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
                value="completed"
                className="rounded-md px-4 py-1.5 text-sm font-medium text-zinc-400 transition-colors data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-none hover:text-zinc-300 data-[state=inactive]:bg-transparent after:hidden"
              >
                Completed
              </TabsTrigger>
              <TabsTrigger
                value="pending"
                className="rounded-md px-4 py-1.5 text-sm font-medium text-zinc-400 transition-colors data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-none hover:text-zinc-300 data-[state=inactive]:bg-transparent after:hidden"
              >
                Pending
              </TabsTrigger>
              <TabsTrigger
                value="failed"
                className="rounded-md px-4 py-1.5 text-sm font-medium text-zinc-400 transition-colors data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-none hover:text-zinc-300 data-[state=inactive]:bg-transparent after:hidden"
              >
                Failed
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
                Payment ID
              </TableHead>
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
                Total Amount
              </TableHead>
              <TableHead className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Commission
              </TableHead>
              <TableHead className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Driver Earning
              </TableHead>
              <TableHead className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Method
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
            {payments.map((payment) => (
              <TableRow
                key={payment.id}
                className="border-white/10 text-white transition-colors hover:bg-white/5"
              >
                <TableCell className="px-4 py-3">
                  <span className="cursor-pointer text-sm font-medium text-blue-400 hover:underline">
                    #{payment.paymentId}
                  </span>
                </TableCell>
                <TableCell className="px-4 py-3">
                  <span className="cursor-pointer text-sm font-medium text-blue-400 hover:underline">
                    #{payment.rideId}
                  </span>
                </TableCell>
                <TableCell className="px-4 py-3 text-sm text-zinc-300">
                  {payment.driverName}
                </TableCell>
                <TableCell className="px-4 py-3 text-sm text-zinc-300">
                  {payment.passengerName}
                </TableCell>
                <TableCell className="px-4 py-3 text-sm text-zinc-300">
                  {payment.totalAmount}
                </TableCell>
                <TableCell className="px-4 py-3 text-sm font-medium text-blue-400">
                  {payment.commission}
                </TableCell>
                <TableCell className="px-4 py-3 text-sm font-medium text-emerald-400">
                  {payment.driverEarning}
                </TableCell>
                <TableCell className="px-4 py-3 text-sm text-zinc-300">
                  {payment.method}
                </TableCell>
                <TableCell className="px-4 py-3 text-sm text-zinc-300">
                  {payment.dateTime}
                </TableCell>
                <TableCell className="px-4 py-3">
                  <StatusBadge status={payment.status} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow className="bg-background">
              <TableCell colSpan={10} className="px-4 py-3">
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
