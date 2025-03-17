import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authoptions";
import { connectToDatabase } from "@/lib/db";
import Item from "@/lib/models/item";
import User from "@/lib/models/user"; // Import User model

export async function POST(req: NextRequest) {
  await connectToDatabase();
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { item } = await req.json();

    if (!item) {
      return NextResponse.json({ message: "Item ID is required" }, { status: 400 });
    }

    // Check if item exists
    const foundItem = await Item.findById(item);
    if (!foundItem) {
      return NextResponse.json({ message: "Item not found" }, { status: 404 });
    }

    // ✅ Push item ID into user's cart array using $push
    await User.findByIdAndUpdate(
      "67d7baa198ad64d2a66ba4d7",
      { $push: { cart: item } }, // Push item ID to cart array
      { new: true } // Return updated document
    );

    return NextResponse.json(
      { message: "Item added to cart successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Add to cart error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
