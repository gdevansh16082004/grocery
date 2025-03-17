import { DashboardHeader } from "@/components/sellerComponents/header"

export default function OrdersPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader />
      <div className="flex-1 space-y-6 p-6">
        <h1 className="text-3xl font-bold">Orders</h1>
        <p className="text-muted-foreground">Manage your customer orders here.</p>
      </div>
    </div>
  )
}

