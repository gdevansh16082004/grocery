

import { StoreCard } from "./store-card"
import { connectToDatabase } from "@/lib/db"
import Seller from "@/lib/models/seller"

//dummy store array
// const stores = [
//   {
//     _id: "1",
//     name: "Store 1",
//     description: "Store 1 description",
//     image: "https://via.placeholder.com/150",
//   },
//   {
//     _id: "2",
//     name: "Store 2",
//     description: "Store 2 description",
//     image: "https://via.placeholder.com/150",
//   },
//   {
//     _id: "3",
//     name: "Store 3",
//     description: "Store 3 description",
//     image: "https://via.placeholder.com/150",
//   },
// ];

export async  function StoreGrid() {
  await connectToDatabase();
  // console.log("Connected to DB");

  let stores = [];
  try {
    stores = await Seller.find({});
    // console.log("Stores fetched:", stores);
  } catch (error) {
    console.error("Error fetching stores:", error);
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {stores.map((store) => (
        <StoreCard key={store._id} store={store} />
      ))}
    </div>
  );
}
