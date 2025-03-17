import { DashboardHeader } from "@/components/sellerComponents/header"
import { StatsCards } from "@/components/sellerComponents/stats-cards"
import { SalesChart } from "@/components/sellerComponents/sales-chart"
import { RecentOrders } from "@/components/sellerComponents/recent-orders"

export default function DashboardPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader />
      <div className="flex-1 space-y-6 p-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <StatsCards />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SalesChart />
          <RecentOrders />
        </div>
      </div>
    </div>
  )
}

