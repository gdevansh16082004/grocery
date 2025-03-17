import { DashboardHeader } from "@/components/sellerComponents/header"

export default function PromotionsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader />
      <div className="flex-1 space-y-6 p-6">
        <h1 className="text-3xl font-bold">Promotions</h1>
        <p className="text-muted-foreground">Create and manage your promotional campaigns here.</p>
      </div>
    </div>
  )
}

