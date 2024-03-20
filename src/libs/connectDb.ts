import mongoose from "mongoose";

const connectDB = async () => {
  const url = process.env.DB_URL;
  if (!url) {
    throw new Error("DB_URL is not defined");
  }
  return mongoose.connect(url);
};

export default connectDB;
