"use client";

import SmallPageInfo from "@/components/common/smallPageInfo/smallPageInfo";
import AnalyticsStats from "./AnalyticsStats";
import DriverPerformanceTrends from "./DriverPerformanceTrends";
import UserEnagementTrends from "./UserEnagementTrends";
import RevenueBreakdown from "./RevenueBreakdown";
import type { DriverPerformanceDataPoint } from "./DriverPerformanceTrends";
import type { UserEngagementDataPoint } from "./UserEnagementTrends";
import type { RevenueBreakdownDataPoint } from "./RevenueBreakdown";

const driverPerformanceData: DriverPerformanceDataPoint[] = [
  { week: "Week 1", earnings: 5000, rides: 800 },
  { week: "Week 2", earnings: 5500, rides: 900 },
  { week: "Week 3", earnings: 6000, rides: 850 },
  { week: "Week 4", earnings: 6800, rides: 950 },
];

const userEngagementData: UserEngagementDataPoint[] = [
  { day: "Mon", activeUsers: 240, newUsers: 50 },
  { day: "Tue", activeUsers: 200, newUsers: 50 },
  { day: "Wed", activeUsers: 280, newUsers: 60 },
  { day: "Thu", activeUsers: 250, newUsers: 60 },
  { day: "Fri", activeUsers: 320, newUsers: 80 },
  { day: "Sat", activeUsers: 410, newUsers: 100 },
  { day: "Sun", activeUsers: 380, newUsers: 90 },
];

const revenueBreakdownData: RevenueBreakdownDataPoint[] = [
  { month: "Jan", revenue: 62000, driverEarnings: 48000, commission: 14000 },
  { month: "Feb", revenue: 65000, driverEarnings: 50000, commission: 15000 },
  { month: "Mar", revenue: 60000, driverEarnings: 47000, commission: 13000 },
  { month: "Apr", revenue: 58000, driverEarnings: 45000, commission: 13000 },
  { month: "May", revenue: 72000, driverEarnings: 56000, commission: 16000 },
  { month: "Jun", revenue: 78000, driverEarnings: 61000, commission: 17000 },
  { month: "Jul", revenue: 82000, driverEarnings: 64000, commission: 18000 },
];

function AnalyticsLayout() {
  return (
    <div className="space-y-4">
      <SmallPageInfo
        title="Analytics"
        description="View your analytics and reports."
      />
      <AnalyticsStats />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <DriverPerformanceTrends data={driverPerformanceData} />
        <UserEnagementTrends data={userEngagementData} />
      </div>
      <RevenueBreakdown data={revenueBreakdownData} />
    </div>
  );
}

export default AnalyticsLayout;
