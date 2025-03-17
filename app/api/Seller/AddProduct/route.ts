import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectToDatabase } from "@/lib/db";
import Item from "@/lib/models/item"; // Your Item model
import cloudinary from "@/lib/cloudinary";

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();

    // Extract token from cookies
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string; role: string };

    // Ensure only sellers can post items
    if (decoded.role !== "seller") {
      return NextResponse.json({ error: "Access Denied" }, { status: 403 });
    }

    // Get item details from request body
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const price = Number(formData.get("price"));
    const quantity = Number(formData.get("quantity"));
    const description = formData.get("description") as string;
    const file = formData.get("file") as Blob | null;
    const category = formData.get("category") as string;

    if (!name || !price || !quantity || !description ||!file||!category) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // 🔹 Convert image to Base64
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64Image = `data:${file.type};base64,${buffer.toString("base64")}`;

    // 🔹 Upload image to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(base64Image, {
      folder: "grocery_app",
      resource_type: "auto",
    });

    // 🔹 Save Item to MongoDB
    const newItem = await Item.create({
      name,
      price,
      quantity,
      description,
      category,
      images: [uploadResponse.secure_url], // Store Cloudinary URL
      seller: decoded.id // Store seller's ID from token
    });

    return NextResponse.json({ message: "Item added successfully", item: newItem }, { status: 201 });
  } catch (error) {
    console.error("Error adding item:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}