import { SearchBar } from "@/components/userComponents/search-bar";
import { CategoryFilter } from "@/components/userComponents/category-filter";
import { ProductGrid } from "@/components/userComponents/product-grid";
import { connectToDatabase } from "@/lib/db";
import Seller from "@/lib/models/seller";
import item from "@/lib/models/item";
import { notFound } from "next/navigation"; // ✅ Handle 404 cases properly

interface StorePageProps {
  params: {
    storeId: string;
  };
}

export default async function StorePage({ params }: StorePageProps) {
  console.log(params);
  const { storeId } = params;

  await connectToDatabase();
  const store = await Seller.findById(storeId);

  if (!store) {
    return notFound(); // ✅ Return 404 if store is not found
  }

  const items = await item.find({ seller: storeId });

  console.log(items);

  const categories = [...new Set(items.map((product) => product.category))];

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
          <ProductGrid products={items} />
        </div>
      </div>
    </main>
  );
}
