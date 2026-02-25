const Project = require('../models/Project');
const cloudinary = require('../utils/cloudinary');
const fs = require('fs');

// @desc    Get all projects
// @route   GET /api/projects
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc Featured Projects
exports.getFeaturedProjects = async (req, res) => {
  try {
    const projects = await Project.find({ featured: true }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc Single Project
exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.status(200).json({
      success: true,
      data: project
    });

  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc Create Project
exports.createProject = async (req, res) => {
  try {

    let imageData = {};

    if (req.file) {

      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "portfolio_projects",
        resource_type: "image",
        transformation: [
          { width: 1200, crop: "limit" },
          { quality: "auto" },
          { fetch_format: "auto" }
        ]
      });

      imageData.image = result.secure_url;
      imageData.cloudinaryId = result.public_id;

      fs.unlinkSync(req.file.path); // delete local file
    }

    const project = await Project.create({
      ...req.body,
      ...imageData
    });

    res.status(201).json({
      success: true,
      data: project
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

// @desc Update Project
exports.updateProject = async (req, res) => {
  try {

    let project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    let updateData = { ...req.body };

    if (req.file) {

      if (project.cloudinaryId) {
        await cloudinary.uploader.destroy(project.cloudinaryId);
      }

      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "portfolio_projects",
        resource_type: "image",
        transformation: [
          { width: 1200, crop: "limit" },
          { quality: "auto" },
          { fetch_format: "auto" }
        ]
      });

      updateData.image = result.secure_url;
      updateData.cloudinaryId = result.public_id;

      fs.unlinkSync(req.file.path);
    }

    project = await Project.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      data: project
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

// @desc Delete Project
exports.deleteProject = async (req, res) => {
  try {

    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    if (project.cloudinaryId) {
      await cloudinary.uploader.destroy(project.cloudinaryId);
    }

    await project.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Project deleted successfully'
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};