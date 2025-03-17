import { StoreCard } from "./store-card"
import { connectToDatabase } from "@/lib/db"
import Seller from "@/lib/models/seller"

export async function StoreGrid() {
  await connectToDatabase();

  let stores = [];
  try {
    stores = await Seller.find({});
  } catch (error) {
    console.error("Error fetching stores:", error);
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {stores.map((store) => (
        <StoreCard key={store._id.toString()} store={store} />
      ))}
    </div>
  );
}
