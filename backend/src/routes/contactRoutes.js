const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

// GET /api/contacts - list all contact form submissions
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: "Error fetching contacts" });
  }
});

// POST /api/contacts - new contact form submission
router.post("/", async (req, res) => {
  try {
    const { fullName, email, mobile, city } = req.body;
    if (!fullName || !email || !mobile || !city) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const contact = new Contact({ fullName, email, mobile, city });
    const saved = await contact.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: "Error creating contact", error: err.message });
  }
});

module.exports = router;
