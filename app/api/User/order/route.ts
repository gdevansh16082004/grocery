import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authoptions";
import { connectToDatabase } from "@/lib/db";
import Order from "@/lib/models/orders";
import Item from "@/lib/models/item";
import User from "@/lib/models/user";

export async function POST(req: NextRequest) {
  await connectToDatabase();
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { items, deliverySlot, seller, address } = await req.json();

    if (!items || !Array.isArray(items) || items.length === 0 || !seller || !address) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    let totalBill = 0;
    const orderItems = [];

    for (const { item, quantity } of items) {
      const foundItem = await Item.findById(item);
      if (!foundItem) {
        return NextResponse.json({ message: `Item with ID ${item} not found` }, { status: 404 });
      }
      orderItems.push({ item: foundItem._id, quantity });
      totalBill += foundItem.price * quantity;
    }

    // Create the order with an array of items
    const order = await Order.create({
      items: orderItems,
      bill: totalBill,
      deliverySlot,
      address,
      seller: seller,
    
    });

    // Push order ID into user's orders array
    await User.findByIdAndUpdate(
      "67d7baa198ad64d2a66ba4d7",
      { $push: { orders: order._id } },
      { new: true }
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
