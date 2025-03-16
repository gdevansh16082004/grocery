// import { NextApiRequest, NextApiResponse } from "next";
// import { connectToDatabase } from "@/lib/db";
// import User, { IUser } from "@/lib/models/user";
// import { NextDataPathnameNormalizer } from "next/dist/server/normalizers/request/next-data";
// import { NextResponse } from "next/server";

// export async function POST(req:Request , res:Response)  {

//   try {
//     await connectToDatabase();
//     console.log("Connected to database");
//     const { email, name,password } = await req.json();
//     await User.create({ email, name,password });

  

//     return new Response('user added', { status: 200 });
//   } catch (error) {
//     console.error(error);
//     return new Response('error', { status: 500 });
//   }
// }