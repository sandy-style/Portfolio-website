import mongoose from "mongoose";
import dotenv from "dotenv/config";
const connectDb = async () => {
  mongoose.connection.on("connected", () => {
    console.log("mongodb connected ✅");
  });
  await mongoose.connect(process.env.MONGO_DB_URL);
};

export default connectDb;
