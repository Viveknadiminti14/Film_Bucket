// server.js
import express from "express";         // Web framework
import cors from "cors";              // Cross-origin support
import dotenv from "dotenv";          // Load environment variables
import connectDB from "./db.js";      // MongoDB connection
import watchlistRoutes from "./routes/watchlist.js"; // Routes

dotenv.config();                      // Load .env variables

const app = express();                // Initialize Express app
connectDB();                          // Connect to MongoDB

app.use(cors());                      // Allow requests from frontend
app.use(express.json());              // Parse incoming JSON

// Mount watchlist routes at /api/watchlist
app.use("/api/watchlist", watchlistRoutes);

// Default port or 5000
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
