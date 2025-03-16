import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

interface MongooseGlobal {
  mongoose: {
    conn: any;
    promise: any;
  };
}

declare global {
  var mongoose: {
    conn: any;
    promise: any;
  };
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    console.log(MONGODB_URI);
    cached.promise = mongoose.connect(MONGODB_URI as string, {
    }).then((mongoose) => mongoose);
    console.log(MONGODB_URI);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
