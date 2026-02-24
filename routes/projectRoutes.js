const express = require('express');
const router = express.Router();
const { validateObjectId } = require('../middleware/validation');
const { protect } = require('../middleware/auth');
const {
  getProjects,
  getFeaturedProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
} = require('../controllers/projectController');

router.route('/')
  .get(getProjects)
  .post(protect, createProject);

router.get('/featured', getFeaturedProjects);

router.route('/:id')
  .get(validateObjectId, getProjectById)
  .put(validateObjectId, protect, updateProject)
  .delete(validateObjectId, protect, deleteProject);

module.exports = router;