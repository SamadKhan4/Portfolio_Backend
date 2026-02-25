const express = require("express");
const router = express.Router();

const { validateObjectId } = require("../middleware/validation");
const { protect } = require("../middleware/auth");
const upload = require("../middleware/upload");

const {
  getProjects,
  getFeaturedProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
} = require("../controllers/projectController");

/*
================================
Public Routes
================================
*/

// Get all projects
router.get("/", getProjects);

// Get featured projects
router.get("/featured", getFeaturedProjects);

// Get single project
router.get("/:id", validateObjectId, getProjectById);


/*
================================
Protected Admin Routes
================================
*/

// Create project
router.post(
  "/",
  protect,
  upload.single("image"),
  createProject
);

// Update project
router.put(
  "/:id",
  protect,
  validateObjectId,
  upload.single("image"),
  updateProject
);

// Delete project
router.delete(
  "/:id",
  protect,
  validateObjectId,
  deleteProject
);

module.exports = router;