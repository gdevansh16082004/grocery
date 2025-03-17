import { DashboardHeader } from "@/components/sellerComponents/header";
// import { StatsCards } from "@/components/sellerComponents/stats-cards"
// import { SalesChart } from "@/components/sellerComponents/sales-chart"
import { RecentOrders } from "@/components/sellerComponents/recent-orders";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import Seller from "@/lib/models/seller";
import Order from "@/lib/models/orders";
import { connectToDatabase } from "@/lib/db";

interface User {
  id: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

interface IOrders {
  bill: number;
  deliverySlot: string;
  address: string;
  status: string;
}

export default async function DashboardPage() {
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

  // ✅ Fetch Orders
  const orders = (await Order.find({ seller: user.id })) as IOrders[];
  

  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader />
      <div className="flex-1 space-y-6 p-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        {/* <StatsCards /> */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentOrders orders={orders} />
        </div>
      </div>
    </div>
  );
}
