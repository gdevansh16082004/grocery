import mongoose, { Connection } from "mongoose";

const MONGODB_URI: string = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

interface MongooseCache {
  conn: Connection | null;
  promise: Promise<Connection> | null;
}

// Use a global cache without `var`
const globalCache: Record<string, MongooseCache> = globalThis as unknown as Record<string, MongooseCache>;
const cached: MongooseCache = globalCache._mongooseCache ?? { conn: null, promise: null };

// Store the cache in `globalThis` for reusability across hot reloads
globalCache._mongooseCache = cached;

export async function connectToDatabase(): Promise<Connection> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    console.log("Connecting to MongoDB...");
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => mongoose.connection);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
