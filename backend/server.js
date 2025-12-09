// backend/server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Route imports
const projectRoutes = require("./src/routes/projectRoutes");
const clientRoutes = require("./src/routes/clientRoutes");
const contactRoutes = require("./src/routes/contactRoutes");
const subscriberRoutes = require("./src/routes/subscriberRoutes");

// Base route
app.get("/", (req, res) => {
  res.json({ message: "ProMan API is running" });
});

// API routes
app.use("/api/projects", projectRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/subscribers", subscriberRoutes);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
  });
