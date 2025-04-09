import express from "express";
import cors from "cors";
import { connectDB } from "./Confing/db.js";
import authRoutes from "./routes/authRoutes.js";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// App config
const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cors());

// DB connection
connectDB();

// Routes
app.use("/api/auth", authRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("API Working");
});

// Start server
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});