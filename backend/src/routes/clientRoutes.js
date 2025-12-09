const express = require("express");
const router = express.Router();
const Client = require("../models/Client");

// GET /api/clients - list all clients & reviews
router.get("/", async (req, res) => {
  try {
    const clients = await Client.find().sort({ createdAt: -1 });
    res.json(clients);
  } catch (err) {
    res.status(500).json({ message: "Error fetching clients" });
  }
});

// POST /api/clients - admin/manual create testimonial
router.post("/", async (req, res) => {
  try {
    const { name, designation, imageUrl, description, rating } = req.body;

    if (!name || !designation || !description) {
      return res
        .status(400)
        .json({ message: "Name, designation and description are required" });
    }

    const client = new Client({
      name,
      designation,
      imageUrl,
      description,
      rating: rating || 5,
    });

    const saved = await client.save();
    res.status(201).json(saved);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error creating client", error: err.message });
  }
});

// POST /api/clients/public-review - customer submits review from landing page
router.post("/public-review", async (req, res) => {
  try {
    const { name, description, rating } = req.body;

    if (!name || !description) {
      return res
        .status(400)
        .json({ message: "Name and review text are required" });
    }

    const safeRating =
      typeof rating === "number" && rating >= 1 && rating <= 5
        ? rating
        : 5;

    const client = new Client({
      name,
      designation: "Customer", // fixed label
      description,
      rating: safeRating,
      imageUrl: `https://api.multiavatar.com/${encodeURIComponent(
        name
      )}.svg`, // fun avatar per name
    });

    const saved = await client.save();
    res.status(201).json(saved);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error creating review", error: err.message });
  }
});

// PUT /api/clients/:id - optional: update client
router.put("/:id", async (req, res) => {
  try {
    const updated = await Client.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ message: "Client not found" });
    res.json(updated);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error updating client", error: err.message });
  }
});

// DELETE /api/clients/:id - delete client/review
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Client.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Client not found" });
    res.json({ message: "Client deleted" });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error deleting client", error: err.message });
  }
});

module.exports = router;
