import SmallPageInfo from "@/components/common/smallPageInfo/smallPageInfo";
import Stats, { type StatItem } from "@/components/dashboard/overview/stats";
import BookingTrendsBarchart, {
    type BookingTrendsDataPoint,
} from "@/components/dashboard/overview/BookingTrendsBarchart";
import RevenueTrendsBarchart, {
    type RidesOverviewDataPoint,
} from "@/components/dashboard/overview/RevenueTrendsBarchart";
import RecentActivity, {
    type ActivityItem,
} from "@/components/dashboard/overview/ParkingSpaces";
import { Users, CircleParking, Euro, BookOpen } from "lucide-react";

const iconBg = {
    blue: "bg-[#0f2231]",
    green: "bg-[#006456]",
    purple: "bg-[#5e1c8a]",
} as const;

const overviewStats: StatItem[] = [
    { label: "Total Users", value: "12,458", icon: <Users />, iconBg: iconBg.blue },
    { label: "Total Parking Spaces", value: "1.5K", icon: <CircleParking />, iconBg: iconBg.green },
    { label: "Total Revenue", value: "$54,890", icon: <Euro />, iconBg: iconBg.purple },
    { label: "Total Bookings", value: "1.5K", icon: <BookOpen />, iconBg: iconBg.green },
];

const bookingTrendsData: BookingTrendsDataPoint[] = [
    { day: "Mon", bookings: 45 },
    { day: "Tue", bookings: 52 },
    { day: "Wed", bookings: 38 },
    { day: "Thu", bookings: 65 },
    { day: "Fri", bookings: 72 },
    { day: "Sat", bookings: 87 },
    { day: "Sun", bookings: 78 },
];

const ridesOverviewData: RidesOverviewDataPoint[] = [
    { day: "Mon", active: 475, completed: 125 },
    { day: "Tue", active: 525, completed: 175 },
    { day: "Wed", active: 500, completed: 125 },
    { day: "Thu", active: 600, completed: 175 },
    { day: "Fri", active: 675, completed: 225 },
    { day: "Sat", active: 825, completed: 250 },
    { day: "Sun", active: 775, completed: 225 },
];

const recentActivityData: ActivityItem[] = [
    { description: "New driver approved: John Smith", timestamp: "5 min ago", dotColor: "green" },
    { description: "Dispute reported for Ride #12847", timestamp: "12 min ago", dotColor: "red" },
    { description: "High-value ride completed: $285", timestamp: "18 min ago", dotColor: "purple" },
    { description: "Driver suspended: Michael Brown", timestamp: "34 min ago", dotColor: "red" },
];

function OverviewLayout() {
    return (
        <div className="space-y-6">
            <SmallPageInfo
                title="Admin Overview Dashboard"
                description="Monitor platform activity, live rides, revenue, and system performance at a glance."
            />
            <Stats items={overviewStats} />
            <div className="grid gap-4 md:grid-cols-2">
                <RevenueTrendsBarchart data={ridesOverviewData} />
                <RecentActivity items={recentActivityData} />

            </div>
            <BookingTrendsBarchart data={bookingTrendsData} />
        </div>
    );
}

export default OverviewLayout;
