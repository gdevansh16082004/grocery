import { DashboardHeader } from "@/components/sellerComponents/header"

export default function ProductsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader />
      <div className="flex-1 space-y-6 p-6">
        <h1 className="text-3xl font-bold">Products</h1>
        <p className="text-muted-foreground">Manage your product catalog here.</p>
      </div>
    </div>
  )
}

