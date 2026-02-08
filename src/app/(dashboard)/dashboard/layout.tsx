import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/dashboard/AppSidebar"
import { DashboardHeader } from "@/components/dashboard/DashboardHeader"

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider >
            <AppSidebar />
            <main className="w-full flex flex-col">
                <header className="flex h-14 shrink-0 items-center gap-4 border-b border-sidebar-border bg-[oklch(0.2077 0.0398 265.75)] px-4">
                    <SidebarTrigger className="text-white p-1" />
                    <DashboardHeader />
                </header>
                <div className="flex-1 p-4 bg-[#0f172a]">{children}</div>
            </main>
        </SidebarProvider>
    )
}
