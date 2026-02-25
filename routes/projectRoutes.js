const express = require('express');
const router = express.Router();
const { validateObjectId } = require('../middleware/validation');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');
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
  .post(protect, upload.single('image'), createProject);

router.get('/featured', getFeaturedProjects);

router.route('/:id')
  .get(validateObjectId, getProjectById)
  .put(validateObjectId, protect, upload.single('image'), updateProject)
  .delete(validateObjectId, protect, deleteProject);

module.exports = router;