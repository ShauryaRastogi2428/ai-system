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

// ========================
// 🔥 MIDDLEWARE
// ========================
app.use(express.json());

// ========================
// 🔥 CORS FIX (FINAL)
// ========================
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://ai-system-1-w3ix.onrender.com"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

// Preflight support
app.options("*", cors());

// ========================
// 🔥 HEALTH CHECK ROUTE
// ========================
app.get("/", (req, res) => {
  res.status(200).send("AI Recruiter Backend Running 🚀");
});

// ========================
// 🔥 API ROUTES
// ========================
app.use("/api/candidates", candidateRoutes);
app.use("/api/match", matchRoutes);
app.use("/api/ai", aiRoutes);

// ========================
// 🔥 DATABASE + SERVER START
// ========================
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