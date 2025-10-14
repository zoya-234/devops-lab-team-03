import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://zoya-234:cmdYhLRquUzUVX9E@cluster0.rois57z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("✅ MongoDB Atlas connected");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
  }
};

export default connectDB;
