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
    CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Clock, FileText, Download } from "lucide-react";
import FilterSearch from "@/components/common/filter/FIlterSearch";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PageLimit from "@/components/common/pagelimit/PageLimit";
import { GenerationModal } from "./GenerationModal";
import { download1099PDF } from "./Form1099NECDocument";

export type TaxRecordStatus = "completed" | "sent" | "generated";

export type TaxRecord = {
    id: string;
    driverName: string;
    driverId: string;
    totalAnnualEarnings: string;
    taxYear: string;
    status: TaxRecordStatus;
    lastUpdated: string;
};

type RecordTableProps = {
    records?: TaxRecord[];
    className?: string;
};

function StatusBadge({ status }: { status: TaxRecordStatus }) {
    const config: Record<
        TaxRecordStatus,
        { className: string; icon: React.ReactNode; label: string }
    > = {
        generated: {
            className: "bg-emerald-600/90 text-white",
            icon: <FileText className="size-3" />,
            label: "Generated",
        },
        completed: {
            className: "bg-green-600/90 text-white",
            icon: <Check className="size-3" />,
            label: "Completed",
        },
        sent: {
            className: "bg-blue-600/90 text-white",
            icon: <Clock className="size-3" />,
            label: "Sent",
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

const defaultRecords: TaxRecord[] = [
    { id: "1", driverName: "Michael Chen", driverId: "DR-4521", totalAnnualEarnings: "$68,450.00", taxYear: "2025", status: "completed", lastUpdated: "Feb 10, 2026" },
    { id: "2", driverName: "Jessica Martinez", driverId: "DR-4522", totalAnnualEarnings: "$72,890.50", taxYear: "2025", status: "generated", lastUpdated: "Feb 08, 2026" },
    { id: "3", driverName: "Robert Taylor", driverId: "DR-4523", totalAnnualEarnings: "$54,320.75", taxYear: "2025", status: "completed", lastUpdated: "Feb 12, 2026" },
    { id: "4", driverName: "Amanda Wilson", driverId: "DR-4524", totalAnnualEarnings: "$81,250.00", taxYear: "2025", status: "sent", lastUpdated: "Feb 10, 2026" },
    { id: "5", driverName: "David Kim", driverId: "DR-4525", totalAnnualEarnings: "$45,780.25", taxYear: "2025", status: "completed", lastUpdated: "Feb 08, 2026" },
    { id: "6", driverName: "Marcus Rodriguez", driverId: "DR-4526", totalAnnualEarnings: "$59,340.50", taxYear: "2025", status: "completed", lastUpdated: "Feb 10, 2026" },
    { id: "7", driverName: "Sarah Johnson", driverId: "DR-4527", totalAnnualEarnings: "$76,520.00", taxYear: "2025", status: "sent", lastUpdated: "Feb 12, 2026" },
    { id: "8", driverName: "Thomas Brown", driverId: "DR-4528", totalAnnualEarnings: "$62,890.75", taxYear: "2025", status: "completed", lastUpdated: "Feb 12, 2026" },
];

export default function RecordTable({
    records: initialRecords = defaultRecords,
    className,
}: RecordTableProps) {
    const [records, setRecords] = React.useState<TaxRecord[]>(initialRecords);
    const [searchQuery, setSearchQuery] = React.useState("");
    const [statusFilter, setStatusFilter] = React.useState<"all" | TaxRecordStatus>("all");
    const [generationOpen, setGenerationOpen] = React.useState(false);

    const filteredRecords = React.useMemo(() => {
        let list = records;
        if (statusFilter !== "all") {
            list = list.filter((r) => r.status === statusFilter);
        }
        if (searchQuery.trim()) {
            const q = searchQuery.trim().toLowerCase();
            list = list.filter(
                (r) =>
                    r.driverName.toLowerCase().includes(q) ||
                    r.driverId.toLowerCase().includes(q)
            );
        }
        return list;
    }, [records, statusFilter, searchQuery]);

    const [pagination, setPagination] = React.useState({
        page: 1,
        pageSize: 10,
        totalCount: filteredRecords.length,
    });

    React.useEffect(() => {
        setPagination((p) => {
            const total = filteredRecords.length;
            const maxPage = Math.max(1, Math.ceil(total / p.pageSize));
            const page = p.page > maxPage ? 1 : p.page;
            return { ...p, totalCount: total, page };
        });
    }, [filteredRecords.length, statusFilter, searchQuery]);

    const paginatedRecords = React.useMemo(() => {
        const start = (pagination.page - 1) * pagination.pageSize;
        return filteredRecords.slice(start, start + pagination.pageSize);
    }, [filteredRecords, pagination.page, pagination.pageSize]);

    const handleGenerationSuccess = () => {
        setRecords((prev) =>
            prev.map((r) => ({
                ...r,
                status: "sent" as TaxRecordStatus,
                lastUpdated: new Date().toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                }),
            }))
        );
    };

    return (
        <>
            <Card
                className={cn(
                    "overflow-hidden rounded-lg border border-white/10 bg-[#10162B]",
                    className
                )}
            >
                <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="space-y-1">
                        <CardTitle className="text-xl font-bold text-white">
                            1099 Tax Records
                        </CardTitle>
                        <CardDescription className="text-sm text-zinc-400">
                            Generate and manage annual tax documents for drivers.
                        </CardDescription>
                    </div>
                    <CardAction className="shrink-0">
                        <Button
                            className="gap-2 bg-blue-600 hover:bg-blue-700"
                            onClick={() => setGenerationOpen(true)}
                        >
                            <FileText className="size-4" />
                            Generate All 1099 Forms
                        </Button>
                    </CardAction>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="w-full sm:max-w-md">
                            <FilterSearch
                                showFilterButton={false}
                                showAddButton={false}
                                placeholder="Search by driver name or ID..."
                                searchText={searchQuery}
                                setSearchText={setSearchQuery}
                            />
                        </div>
                        <Tabs
                            value={statusFilter}
                            onValueChange={(v) => setStatusFilter(v as "all" | TaxRecordStatus)}
                            className="w-full sm:w-auto"
                        >
                            <TabsList className="h-9 rounded-lg border-2 bg-background p-1 gap-0">
                                <TabsTrigger
                                    value="all"
                                    className="rounded-md px-4 py-1.5 text-sm font-medium text-zinc-400 transition-colors data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-none hover:text-zinc-300 data-[state=inactive]:bg-transparent after:hidden"
                                >
                                    All
                                </TabsTrigger>
                                <TabsTrigger
                                    value="generated"
                                    className="rounded-md px-4 py-1.5 text-sm font-medium text-zinc-400 transition-colors data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-none hover:text-zinc-300 data-[state=inactive]:bg-transparent after:hidden"
                                >
                                    Generated
                                </TabsTrigger>
                                <TabsTrigger
                                    value="sent"
                                    className="rounded-md px-4 py-1.5 text-sm font-medium text-zinc-400 transition-colors data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-none hover:text-zinc-300 data-[state=inactive]:bg-transparent after:hidden"
                                >
                                    Sent
                                </TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </div>

                    <Table>
                        <TableHeader>
                            <TableRow className="border-white/10 hover:bg-transparent">
                                <TableHead className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                                    Driver Name
                                </TableHead>
                                <TableHead className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                                    Driver ID
                                </TableHead>
                                <TableHead className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                                    Total Annual Earnings
                                </TableHead>
                                <TableHead className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                                    Tax Year
                                </TableHead>
                                <TableHead className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                                    Status
                                </TableHead>
                                <TableHead className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                                    Last Updated
                                </TableHead>
                                <TableHead className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {paginatedRecords.map((record) => (
                                <TableRow
                                    key={record.id}
                                    className="border-white/10 text-white transition-colors hover:bg-white/5"
                                >
                                    <TableCell className="px-4 py-3 text-sm text-zinc-300">
                                        {record.driverName}
                                    </TableCell>
                                    <TableCell className="px-4 py-3">
                                        <span className="text-sm font-medium text-blue-400">
                                            #{record.driverId}
                                        </span>
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-sm font-medium text-emerald-400">
                                        {record.totalAnnualEarnings}
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-sm text-zinc-300">
                                        {record.taxYear}
                                    </TableCell>
                                    <TableCell className="px-4 py-3">
                                        <StatusBadge status={record.status} />
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-sm text-zinc-300">
                                        {record.lastUpdated}
                                    </TableCell>
                                    <TableCell className="px-4 py-3">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="gap-2 border-white/20 bg-white/5 text-white hover:bg-white/10"
                                            onClick={() => download1099PDF(record)}
                                        >
                                            <Download className="size-4" />
                                            Download PDF
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow className="bg-background">
                                <TableCell colSpan={7} className="px-4 py-3">
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
            <GenerationModal
                open={generationOpen}
                onOpenChange={setGenerationOpen}
                onSuccess={handleGenerationSuccess}
            />
        </>
    );
}
