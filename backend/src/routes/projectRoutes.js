const express = require("express");
const router = express.Router();
const Project = require("../models/Project");

// GET /api/projects - list all projects
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: "Error fetching projects" });
  }
});

// POST /api/projects - create project
router.post("/", async (req, res) => {
  try {
    const { name, description, imageUrl, tag } = req.body;
    const project = new Project({ name, description, imageUrl, tag });
    const saved = await project.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: "Error creating project", error: err.message });
  }
});

// PUT /api/projects/:id - update project
router.put("/:id", async (req, res) => {
  try {
    const updated = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Project not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: "Error updating project", error: err.message });
  }
});

// DELETE /api/projects/:id - delete project
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Project not found" });
    res.json({ message: "Project deleted" });
  } catch (err) {
    res.status(400).json({ message: "Error deleting project", error: err.message });
  }
});

module.exports = router;
