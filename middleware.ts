import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  // If no token, redirect to login page
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    // Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { role: string };

    // If trying to access /api/seller/* but not a seller, return 403 Forbidden
    if (req.nextUrl.pathname.startsWith("/api/seller") && decoded.role !== "seller") {
      return NextResponse.json({ error: "Forbidden: Only sellers can access this" }, { status: 403 });
    }

    return NextResponse.next(); // Allow request if everything is valid
  } catch (error) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

// Apply only to protected routes
export const config = {
  matcher: ["/api/seller/:path*"], // Protects all API routes under /api/seller/*
};
