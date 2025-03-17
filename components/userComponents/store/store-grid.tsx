import { StoreCard } from "./store-card"
import type { Store } from "@/lib/types"

interface StoreGridProps {
  stores: Store[]
}

export function StoreGrid({ stores }: StoreGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {stores.map((store) => (
        <StoreCard key={store.id} store={store} />
      ))}
    </div>
  )
}

