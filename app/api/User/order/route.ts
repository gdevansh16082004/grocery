import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authoptions";
import { connectToDatabase } from "@/lib/db";
import Order from "@/lib/models/orders";
import Item from "@/lib/models/item";
import User from "@/lib/models/user"; // Import the User model

export async function POST(req: NextRequest) {
  await connectToDatabase();
  const session = await getServerSession(authOptions);

//   if (!session || !session.user) {
//     return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//   }

  try {
    const { item, quantity, deliverySlot, seller, address } = await req.json();

    if (!item || !quantity || !seller || !address) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    // Check if the item exists
    const foundItem = await Item.findById(item);
    if (!foundItem) {
      return NextResponse.json({ message: "Item not found" }, { status: 404 });
    }

    const totalBill = foundItem.price * quantity;

    // Create the order
    const order = await Order.create({
      item: foundItem._id,
      quantity,
      bill: totalBill,
      deliverySlot,
      address,
      seller: seller,
    
    });

    // ✅ Push order ID into user's orders array using $push
    await User.findByIdAndUpdate(
      session.user.id,
      { $push: { orders: order._id } }, // Push order ID to orders array
      { new: true } // Return updated document
    );

    return NextResponse.json(
      { message: "Order placed successfully", order },
      { status: 201 }
    );
  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
