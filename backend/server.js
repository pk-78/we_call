import express from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import connectDB from "./db/db.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import { dirname } from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 5200;

// Middleware
app.use(express.json());

app.use(cors());

// Static files (if any)
// app.use(express.static( "public"));
app.use("/profile", express.static(path.join(__dirname, "uploads/profile")));
app.use("/banner", express.static(path.join(__dirname, "uploads/banners")));
app.use("/posts", express.static(path.join(__dirname, "uploads/posts")));

app.use(express.json({ limit: "16Kb" }));
app.use(express.urlencoded({ extended: true, limit: "16Kb" }));

// Database connection
connectDB();

// Routes
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// Start server
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
