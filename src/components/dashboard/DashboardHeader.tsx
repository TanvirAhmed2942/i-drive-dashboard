"use client";

import Link from "next/link";
import { Bell, ChevronDown, LogOut, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";

const notificationCount = 1;

export function DashboardHeader() {
  return (
    <div className="ml-auto flex items-center gap-2">
      <Button
        variant="ghost"
        size="icon"
        className="relative text-white hover:bg-sidebar-accent"
        aria-label="Notifications"
      >
        <Bell className="size-5" />
        {notificationCount > 0 && (
          <span
            className="absolute -right-0.5 -top-0.5 flex size-4 items-center justify-center rounded-full bg-destructive text-[10px] font-medium text-destructive-foreground"
            aria-hidden
          >
            {notificationCount > 9 ? "9+" : notificationCount}
          </span>
        )}
      </Button>
      <Separator orientation="vertical" className="h-6 bg-border" />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-auto items-center gap-3 rounded-md px-2 py-1.5 text-left hover:bg-sidebar-accent text-white"
          >
            <div className="flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-muted">
              <span className="text-xs font-medium text-muted-foreground">
                AU
              </span>
            </div>
            <div className="flex min-w-0 flex-col">
              <span className="truncate text-sm font-medium">
                Admin User
              </span>
              <span className="truncate text-xs text-muted-foreground">
                Admin
              </span>
            </div>
            <ChevronDown className="size-4 shrink-0 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/dashboard/profile" className="flex items-center gap-2">
              <User className="size-4" />
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/dashboard/settings" className="flex items-center gap-2">
              <Settings className="size-4" />
              Settings
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link
              href="/auth"
              className="flex items-center gap-2 text-destructive focus:text-destructive"
            >
              <LogOut className="size-4" />
              Log out
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
