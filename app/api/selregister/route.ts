import { connectToDatabase } from "@/lib/db";
import Seller from "@/lib/models/seller";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    console.log("Connected to database");

    const { email, name, password, contact, address, operatingHours } = await req.json();

    if (!email || !name || !password) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const existingSeller = await Seller.findOne({ email });
    if (existingSeller) {
      return new NextResponse("Seller already registered", { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newSeller = await Seller.create({
      email,
      name,
      password: hashedPassword,
      contact,
      address,
      operatingHours
    });

    // Generate JWT Token
    const token = jwt.sign(
      { id: newSeller._id, email: newSeller.email, role: "seller" },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    // Set Cookie
    const response = new NextResponse("Seller registered successfully", { status: 201 });
    response.headers.append("Set-Cookie", `token=${token}; HttpOnly; Path=/; Max-Age=604800; Secure`);

    return response;
  } catch (error) {
    console.error("Error registering seller:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
