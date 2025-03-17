import { DashboardHeader } from "@/components/sellerComponents/header";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import Seller from "@/lib/models/seller";
import { connectToDatabase } from "@/lib/db";
import item from "@/lib/models/item";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface User {
  id: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

interface IItems {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  images: string;
}

export default async function ProductsPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    console.log("No token found in cookies!");
    return <div>Unauthorized</div>;
  }

  let user: User;
  try {
    user = jwt.verify(token, process.env.JWT_SECRET!) as User;
    console.log("Decoded JWT:", user);
  } catch (error) {
    console.error("JWT Verification Error:", error);
    return <div>Invalid Token</div>;
  }

  // ✅ Connect to DB
  await connectToDatabase();

  // ✅ Fetch seller
  const seller = await Seller.findById(user.id);

  if (!seller) {
    return <div>Seller Not Found</div>;
  }
  const Items = (await item.find({ seller: user.id })) as IItems[];


  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <DashboardHeader />
      <div className="flex-1 space-y-6 p-6">
        <h1 className="text-3xl font-bold text-gray-800">Products</h1>
        <p className="text-gray-600">Manage your product catalog here.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Items.map((item) => (
            <Card key={item._id} className="rounded-lg  w-52 shadow-md hover:shadow-lg transition-shadow bg-white">
              <CardHeader>
                <img src={item.images} alt={item.name} className="w-full h-40 object-cover rounded-t-lg" />
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle className="text-lg font-semibold text-gray-900">{item.name}</CardTitle>
                <p className="text-gray-600 text-sm">Price: <span className="font-bold text-gray-800">₹{item.price}</span></p>
                <p className="text-gray-600 text-sm">Stock: <span className={`font-semibold ${item.quantity > 0 ? "text-green-600" : "text-red-500"}`}>
                  {item.quantity > 0 ? `${item.quantity} left` : "Out of Stock"}
                </span></p>
                {/* <div className="flex justify-between items-center mt-4">
                  <Button variant="outline" className="text-sm">Edit</Button>
                  <Button variant="destructive" className="text-sm">Delete</Button>
                </div> */}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
