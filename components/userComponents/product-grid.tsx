"use client"

import { useSearchParams } from "next/navigation"
import { ProductCard } from "@/components/userComponents/product-card"
import type { Product } from "@/lib/types"

interface ProductGridProps {
  products: Product[]
}

export function ProductGrid({ products }: ProductGridProps) {
  const searchParams = useSearchParams()
  const query = searchParams.get("query")?.toLowerCase()
  const category = searchParams.get("category")

  const filteredProducts = products.filter((product) => {
    // Filter by category if selected
    if (category && product.category !== category) {
      return false
    }

    // Filter by search query if present
    if (query) {
      return product.name.toLowerCase().includes(query) || product.description.toLowerCase().includes(query)
    }

    return true
  })

  if (filteredProducts.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium">No products found</h3>
        <p className="text-muted-foreground mt-2">
          Try adjusting your search or filter to find what you re looking for.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

