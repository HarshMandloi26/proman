const express = require("express");
const router = express.Router();
const Subscriber = require("../models/Subscriber");

// GET /api/subscribers
router.get("/", async (req, res) => {
  try {
    const subs = await Subscriber.find().sort({ createdAt: -1 });
    res.json(subs);
  } catch (err) {
    res.status(500).json({ message: "Error fetching subscribers" });
  }
});

// POST /api/subscribers
router.post("/", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    // avoid duplicate emails
    const existing = await Subscriber.findOne({ email });
    if (existing) {
      return res.status(200).json({ message: "Already subscribed", subscriber: existing });
    }

    const sub = new Subscriber({ email });
    const saved = await sub.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: "Error creating subscriber", error: err.message });
  }
});

module.exports = router;
