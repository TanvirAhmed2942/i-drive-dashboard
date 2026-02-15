"use client";

import React from "react";
import Link from "next/link";
import {
  Bell,
  ChevronDown,
  LogOut,
  Settings,
  User,
} from "lucide-react";
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
import { useRouter } from "next/navigation";
// import { useTheme } from "next-themes";
import { ProfileSheet } from "./ProfileSheet";

const notificationCount = 1;

export function DashboardHeader() {
  const router = useRouter();
  const [profileSheetOpen, setProfileSheetOpen] = React.useState(false);
  // const { setTheme, resolvedTheme } = useTheme();

  // const toggleTheme = () => {
  //   setTheme(resolvedTheme === "dark" ? "light" : "dark");
  // };

  return (
    <div className="ml-auto flex items-center gap-2">
      {/* <Button
        variant="ghost"
        size="icon"
        className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        aria-label={resolvedTheme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        onClick={toggleTheme}
      >
        {resolvedTheme === "dark" ? (
          <Sun className="size-5" />
        ) : (
          <Moon className="size-5" />
        )}
      </Button>
      <Separator orientation="vertical" className="h-6 bg-sidebar-border" /> */}
      <Button
        variant="ghost"
        size="icon"
        className="relative text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        aria-label="Notifications"
        onClick={() => router.push("/dashboard/notifications")}
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
      <Separator orientation="vertical" className="h-6 bg-sidebar-border" />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-auto items-center gap-3 rounded-md px-2 py-1.5 text-left text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            <div className="flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-sidebar-border bg-sidebar-accent">
              <span className="text-xs font-medium text-sidebar-accent-foreground">
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
          <DropdownMenuItem
            onClick={() => setProfileSheetOpen(true)}
            className="flex cursor-pointer items-center gap-2"
          >
            <User className="size-4" />
            Profile
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
      <ProfileSheet
        open={profileSheetOpen}
        onOpenChange={setProfileSheetOpen}
      />
    </div>
  );
}
