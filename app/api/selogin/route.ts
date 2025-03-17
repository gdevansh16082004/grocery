import { connectToDatabase } from "@/lib/db";
import Seller from "@/lib/models/seller";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    console.log("Connecting to database");
    await connectToDatabase();
    console.log("Connected to database");

    const { email, password } = await req.json();
    if (!email || !password) {
      return new NextResponse("Missing email or password", { status: 400 });
    }

    const seller = await Seller.findOne({ email });
    if (!seller) {
      return new NextResponse("Invalid credentials", { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, seller.password);
    if (!isMatch) {
      return new NextResponse("Invalid credentials", { status: 401 });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { id: seller._id, email: seller.email, role: "seller" },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    // Set Cookie
    const response = new NextResponse("Login successful", { status: 200 });
    // console.log(token);
    response.headers.append("Set-Cookie", `token=${token}; HttpOnly; Path=/; Max-Age=604800; Secure`);

    return response;
  } catch (error) {
    console.error("Error logging in seller:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
