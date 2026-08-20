const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { connectDB } = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const contactRoutes = require("./routes/contactRoutes");

const app = express();

app.use(
  cors({
    origin: "*" // Allows requests from your Vercel frontend domain
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "ResiCare backend API is running"
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "API is healthy"
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);

const PORT = process.env.PORT || 5000;

// Only start the local server if NOT running on Vercel's production environment
if (process.env.NODE_ENV !== "production") {
  const startServer = async () => {
    try {
      await connectDB();

      app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
      });
    } catch (error) {
      console.error("Unable to start server");
      console.error(error.message);
      process.exit(1);
    }
  };

  startServer();
}

// CRITICAL: Export the app so Vercel can handle it as a serverless function
module.exports = app;