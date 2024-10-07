import dotenv from "dotenv"
import mongoose from "mongoose"

dotenv.config()

const DB_URL = process.env.DB_URL

const connectDB = async() => {
  try {
    await mongoose.connect(DB_URL, {
      connectTimeoutMS: 5000, // Give up initial connection after 10 seconds
      socketTimeoutMS: 45000,  // Close sockets after 45 seconds of inactivity
      serverSelectionTimeoutMS: 10000, // Keep trying to send operations for 10 seconds
    })
    console.log(`Database connected to successfully ✅`)
  } catch (error) {
    console.log(`Could not connect to the database 🚫 ${error}  `)
  }
}

export default connectDB