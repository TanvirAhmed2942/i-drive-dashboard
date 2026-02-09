"use client";

import React from "react";
import { HiPlus } from "react-icons/hi";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
type SearchFilterButtonProps = {
    showAddButton?: boolean;
    onClickAddButton?: () => void;
    addButtonText?: string;
    showFilterButton?: boolean;
    selectOptions?: string[];
    placeholder?: string;
    searchByDate?: boolean;
    searchText?: string;
    setSearchText?: (text: string) => void;
    status?: string;
    setStatus?: (status: string) => void;
    selectedDate?: string;
    setSelectedDate?: (date: string) => void;
}
function SearchFilterButton({
    showAddButton = false,
    onClickAddButton = () => { },
    addButtonText = "Add New Client",
    showFilterButton = true,
    selectOptions = ["All Status"],
    placeholder = "Search Client",
    searchByDate = false,
    searchText = "",
    setSearchText = () => { },
    status = "All Status",
    setStatus = () => { },
    selectedDate = "",
    setSelectedDate = () => { },
}: SearchFilterButtonProps) {
    return (
        <div className="flex items-center gap-2 w-full">
            <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-400" />
                <Input
                    className={cn(
                        "h-11 w-full rounded-lg border bg-background pl-10 pr-4 text-white shadow-[0_0_0_1px_rgba(56,189,248,0.15)] placeholder:text-zinc-500",
                        "focus-visible:border-sky-400 focus-visible:ring-sky-500/30 focus-visible:ring-2"
                    )}
                    placeholder={placeholder}
                    value={searchText}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchText(e.target.value)}
                />
            </div>
            {showFilterButton && (
                <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger className="bg-background border">
                        <SelectValue placeholder="All Status" />
                    </SelectTrigger>
                    <SelectContent>
                        {selectOptions.map((option, index) => (
                            <SelectItem key={index} value={option}>
                                {option}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            )}
            {showAddButton && (
                <Button
                    className="bg-blue-500 hover:bg-blue-600 text-white"
                    onClick={onClickAddButton}
                >
                    <HiPlus /> {addButtonText}
                </Button>
            )}

            {searchByDate && (
                <div className="flex items-center gap-2">
                    <Input
                        type="date"
                        className="bg-white border-gray-300"
                        value={selectedDate}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSelectedDate(e.target.value)}
                    />
                </div>
            )}
        </div>
    );
}

export default SearchFilterButton;