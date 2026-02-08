"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Car,
  UserCircle,
  GitBranch,
  CreditCard,
  BarChart3,
  FileText,
  Bell,
  Settings,
  LogOut,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

const dashboardHref = "/dashboard/overview";

const navUserManagement = [
  { title: "Drivers", href: "/dashboard/driver-management", icon: Car },
  { title: "Passengers", href: "/dashboard/passenger-management", icon: UserCircle },
];

const navManagement = [
  { title: "Ride Management", href: "/dashboard/rides", icon: GitBranch },
  {
    title: "Payment & Earning Management",
    href: "/dashboard/payments",
    icon: CreditCard,
  },
  { title: "Analytics & Reports", href: "/dashboard/analytics", icon: BarChart3 },
];

const navOther = [
  { title: "Legal Documents", href: "/dashboard/legal", icon: FileText },
  { title: "Push Notifications", href: "/dashboard/push-notifications", icon: Bell },
  { title: "Platform Settings", href: "/dashboard/settings", icon: Settings },
];

export function AppSidebar() {
  const pathname = usePathname();

  const isDashboardActive =
    pathname === "/dashboard" || pathname === "/dashboard/overview";

  return (
    <Sidebar className="min-w-[250px]">
      <SidebarHeader className="px-3 pt-6 pb-4">
        <div className="text-left text-lg font-bold tracking-wider text-cyan-400 drop-shadow-[0_0_20px_rgba(34,211,238,0.6)]">
          IDRIVE
        </div>
      </SidebarHeader>
      <SidebarContent className="overflow-hidden">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isDashboardActive}
                  className={cn(
                    isDashboardActive && " rounded-lg bg-white text-zinc-800 [&_svg]:text-zinc-800"
                  )}
                >
                  <Link href={dashboardHref}>
                    <LayoutDashboard className="size-4" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator className="mx-3 bg-sidebar-border" />
        <SidebarGroup>
          <SidebarGroupLabel className="px-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
            USER MANAGEMENT
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navUserManagement.map((item) => {
                const active = pathname === item.href;
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={active}
                      className={cn(
                        active &&
                        "mx-3 rounded-lg bg-white text-zinc-800 [&_svg]:text-zinc-800"
                      )}
                    >
                      <Link href={item.href}>
                        <item.icon className="size-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator className="mx-3 bg-sidebar-border" />
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navManagement.map((item) => {
                const active = pathname === item.href;
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={active}
                      className={cn(
                        active &&
                        "mx-3 rounded-lg bg-white text-zinc-800 [&_svg]:text-zinc-800"
                      )}
                    >
                      <Link href={item.href}>
                        <item.icon className="size-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator className="mx-3 bg-sidebar-border" />
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navOther.map((item) => {
                const active = pathname === item.href;
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={active}
                      className={cn(
                        active &&
                        "mx-3 rounded-lg bg-white text-zinc-800 [&_svg]:text-zinc-800"
                      )}
                    >
                      <Link href={item.href}>
                        <item.icon className="size-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="min-w-0 overflow-x-hidden py-3 pe-2 ps-2">
        <SidebarMenu className="min-w-0">
          <SidebarMenuItem className="min-w-0">
            <SidebarMenuButton
              asChild
              className=" min-w-0 rounded-lg border border-destructive/80 bg-transparent text-destructive hover:bg-destructive/10 hover:text-destructive [&_svg]:text-destructive"
            >
              <Link href="/auth" className="block min-w-0 overflow-hidden">
                <LogOut className="size-4" />
                <span>Logout</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <p className="px-3 pt-2 text-left text-xs text-muted-foreground">
          Copyright@app
        </p>
      </SidebarFooter>
    </Sidebar>
  );
}
