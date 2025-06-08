import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import questionRoutes from "./routes/questionRoutes.js";
import ratingRoutes from "./routes/ratingRoutes.js";
const app = express();
const PORT = process.env.PORT || 5000;
// Middleware
app.use(cors());
app.use(express.json());
// MongoDB connection
mongoose
.connect("mongodb://localhost:27017/online-survey", {
useNewUrlParser: true,
useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("MongoDB connection error:", err));
// Routes
app.use("/api/questions", questionRoutes);
app.use("/api/ratings", ratingRoutes);
// Start the server
app.listen(PORT, () => {
console.log(`Server is running on http://localhost:${PORT}`);
});