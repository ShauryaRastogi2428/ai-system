const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const candidateRoutes = require("./routes/candidateRoutes");
const matchRoutes = require("./routes/matchRoutes");
const aiRoutes = require("./routes/aiRoutes");

const app = express();

// Middleware
app.use(express.json());

// 🔥 FIXED CORS (more stable for Render)
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

// Health check route (important for Render monitoring)
app.get("/", (req, res) => {
  res.status(200).send("AI Recruiter Backend Running 🚀");
});

// Routes
app.use("/api/candidates", candidateRoutes);
app.use("/api/match", matchRoutes);
app.use("/api/ai", aiRoutes);

// MongoDB + Server start
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server Running On ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB Error:", error);
    process.exit(1);
  });