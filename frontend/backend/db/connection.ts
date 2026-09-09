import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongooseCache ?? { conn: null, promise: null };
if (!global.mongooseCache) global.mongooseCache = cached;

const CONNECT_OPTIONS = {
  serverSelectionTimeoutMS: 5000,
  maxPoolSize: 5,
  bufferCommands: false,
} as const;

export const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return mongoose.connection;
  }

  if (!MONGODB_URI) {
    console.error("❌ MONGODB_URI is not defined in .env.local");
    throw new Error("MONGODB_URI is missing. Please check your environment variables.");
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, CONNECT_OPTIONS).then((conn) => {
      if (process.env.NODE_ENV !== "production") {
        console.log("✅ MongoDB Connected Successfully");
      }
      cached.conn = conn;
      return conn;
    });
  }

  try {
    await cached.promise;
  } catch (err) {
    cached.promise = null;
    cached.conn = null;
    console.error("❌ MongoDB Connection Error:", err);
    throw err;
  }

  return mongoose.connection;
};
