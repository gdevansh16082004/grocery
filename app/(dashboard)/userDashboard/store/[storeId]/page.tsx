import { SearchBar } from "@/components/search-bar"
import { CategoryFilter } from "@/components/category-filter"
import { ProductGrid } from "@/components/product-grid"
import { getProducts, getStoreById } from "@/lib/data"
import { notFound } from "next/navigation"

export default function StorePage({ params }: { params: { storeId: string } }) {
  const store = getStoreById(params.storeId)

  if (!store) {
    notFound()
  }

  const products = getProducts(params.storeId)
  const categories = [...new Set(products.map((product) => product.category))]

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{store.name}</h1>
        <p className="text-muted-foreground">{store.address}</p>
      </div>

      <div className="mb-8">
        <SearchBar />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <CategoryFilter categories={categories} />
        </div>
        <div className="md:col-span-3">
          <ProductGrid products={products} />
        </div>
      </div>
    </main>
  )
}

