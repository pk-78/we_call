import express from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import connectDB from "./db/db.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5200;

// Middleware
app.use(express.json());
app.use(cors());

// Static files (if any)
app.use(express.static(path.join(process.cwd(), "public")));

// Database connection
connectDB();

// Routes
app.use("/api/user", userRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// Start server
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
