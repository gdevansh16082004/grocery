import { DashboardHeader } from "@/components/sellerComponents/header"

export default function TransactionsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader />
      <div className="flex-1 space-y-6 p-6">
        <h1 className="text-3xl font-bold">Transactions</h1>
        <p className="text-muted-foreground">View and manage your financial transactions here.</p>
      </div>
    </div>
  )
}

