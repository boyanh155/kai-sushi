import mongoose from "mongoose";

declare global {
  var mongoose: any;
}

const url = process.env.DB_URL!;
if (!url) {
  throw new Error("DB_URL is not defined");
}
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      connectTimeoutMS: 30000,
    };

    cached.promise = mongoose.connect(url, opts).then((mongoose) => {
      console.log("DB CONNECTED");
      return mongoose;
    });
  }
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    console.log("DB ERROR ");
    console.error(e);
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectDB;
