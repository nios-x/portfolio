import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

let connecting: Promise<typeof mongoose> | null = null;

const connectDb = async () => {
  const uri = process.env.DB_URL;
  if (!uri) {
    throw new Error("DB_URL is missing. Set it in your environment or .env file.");
  }

  if (mongoose.connection.readyState === 1) return mongoose;
  if (connecting) return connecting;

  connecting = mongoose
    .connect(uri)
    .then((conn) => {
      return conn;
    })
    .catch((err) => {
      connecting = null;
      console.error("Error connecting to MongoDB:", err);
      throw err;
    });

  return connecting;
};

export default connectDb;
