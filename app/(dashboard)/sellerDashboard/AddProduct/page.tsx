import { DashboardHeader } from "@/components/sellerComponents/header"
import AddProductPage from "@/components/sellerComponents/AddProduct"

export default function InventoryPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader />
    
        <AddProductPage />

        
      </div>
  
  )
}

