"use client";

import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type PaginationData = {
    page: number;
    pageSize: number;
    totalCount: number;
};

const ROWS_PER_PAGE_OPTIONS = [10, 20, 50, 100] as const;

type PageLimitProps = {
    pagination: PaginationData;
    onPaginationChange: (pagination: PaginationData) => void;
    itemLabel?: string;
    className?: string;
};

function getPageNumbers(currentPage: number, totalPages: number): (number | "ellipsis")[] {
    if (totalPages <= 7) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const pages: (number | "ellipsis")[] = [];
    if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "ellipsis", totalPages);
    } else if (currentPage >= totalPages - 2) {
        pages.push(1, "ellipsis", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } else {
        pages.push(1, "ellipsis", currentPage - 1, currentPage, currentPage + 1, "ellipsis", totalPages);
    }
    return pages;
}

export default function PageLimit({
    pagination,
    onPaginationChange,
    itemLabel = "items",
    className,
}: PageLimitProps) {
    const { page, pageSize, totalCount } = pagination;
    const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
    const start = totalCount === 0 ? 0 : (page - 1) * pageSize + 1;
    const end = Math.min(page * pageSize, totalCount);

    const handlePageSizeChange = (value: string) => {
        const newPageSize = Number(value);
        const newPage = Math.min(page, Math.ceil(totalCount / newPageSize) || 1);
        onPaginationChange({
            page: newPage,
            pageSize: newPageSize,
            totalCount,
        });
    };

    const goToPage = (newPage: number) => {
        const clamped = Math.max(1, Math.min(newPage, totalPages));
        onPaginationChange({ page: clamped, pageSize, totalCount });
    };

    const pageNumbers = getPageNumbers(page, totalPages);

    return (
        <div
            className={cn(
                "flex flex-wrap items-center justify-between gap-4 border bg-background px-4 py-3 rounded-lg",
                className
            )}
        >
            <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Rows per page</span>
                <Select
                    value={String(pageSize)}
                    onValueChange={handlePageSizeChange}
                >
                    <SelectTrigger className="h-8 w-[70px] rounded-md border bg-white">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        {ROWS_PER_PAGE_OPTIONS.map((size) => (
                            <SelectItem key={size} value={String(size)}>
                                {size}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="text-sm text-muted-foreground">
                Showing{" "}
                <span className="font-medium text-foreground">{start}</span>
                {" to "}
                <span className="font-medium text-foreground">{end}</span>
                {" of "}
                <span className="font-medium text-foreground">{totalCount.toLocaleString()}</span>
                {" "}
                {itemLabel}
            </div>

            <div className="flex items-center gap-0.5">
                <Button
                    variant="ghost"
                    size="icon"
                    className="size-8 rounded-md"
                    onClick={() => goToPage(1)}
                    disabled={page <= 1}
                    aria-label="First page"
                >
                    <ChevronsLeft className="size-4" />
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    className="size-8 rounded-md"
                    onClick={() => goToPage(page - 1)}
                    disabled={page <= 1}
                    aria-label="Previous page"
                >
                    <ChevronLeft className="size-4" />
                </Button>
                {pageNumbers.map((p, i) =>
                    p === "ellipsis" ? (
                        <span
                            key={`ellipsis-${i}`}
                            className="flex size-8 items-center justify-center text-muted-foreground"
                        >
                            ...
                        </span>
                    ) : (
                        <Button
                            key={p}
                            variant="ghost"
                            size="icon"
                            className={cn(
                                "size-8 rounded-full text-sm font-medium",
                                p === page
                                    ? "border border-border bg-white text-foreground shadow-sm"
                                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            )}
                            onClick={() => goToPage(p)}
                            aria-label={`Page ${p}`}
                            aria-current={p === page ? "page" : undefined}
                        >
                            {p}
                        </Button>
                    )
                )}
                <Button
                    variant="ghost"
                    size="icon"
                    className="size-8 rounded-md"
                    onClick={() => goToPage(page + 1)}
                    disabled={page >= totalPages}
                    aria-label="Next page"
                >
                    <ChevronRight className="size-4" />
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    className="size-8 rounded-md"
                    onClick={() => goToPage(totalPages)}
                    disabled={page >= totalPages}
                    aria-label="Last page"
                >
                    <ChevronsRight className="size-4" />
                </Button>
            </div>
        </div>
    );
}
