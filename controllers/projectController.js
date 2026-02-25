const Project = require('../models/Project');
const cloudinary = require('../utils/cloudinary');

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
exports.getProjects = async (req, res, next) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Get featured projects
// @route   GET /api/projects/featured
// @access  Public
exports.getFeaturedProjects = async (req, res, next) => {
  try {
    const projects = await Project.find({ featured: true }).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Get single project
// @route   GET /api/projects/:id
// @access  Public
exports.getProjectById = async (req, res, next) => {
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
    console.error(error);
    
    if (error.name === 'CastError') {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Create project
// @route   POST /api/projects
// @access  Private/Admin
exports.createProject = async (req, res, next) => {
  try {
    let imageData = {};
    
    // Handle image upload if present
    if (req.file) {
      // Upload image to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'portfolio_projects',
        use_filename: false,
        unique_filename: true,
      });
      
      imageData.image = result.secure_url;
      imageData.cloudinaryId = result.public_id;
    } else {
      // If no file is uploaded, check if image URL is provided in the request body
      if (req.body.image) {
        imageData.image = req.body.image;
      } else {
        // If neither file nor URL is provided, throw an error
        return res.status(400).json({
          success: false,
          message: 'Image is required'
        });
      }
    }

    // Combine the image data with other project data
    const projectData = {
      ...req.body,
      ...imageData
    };

    const project = await Project.create(projectData);

    res.status(201).json({
      success: true,
      data: project
    });
  } catch (error) {
    console.error(error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', ')
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private/Admin
exports.updateProject = async (req, res, next) => {
  try {
    let project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    let updateData = { ...req.body };
    
    // Handle image upload if present
    if (req.file) {
      // Delete the old image from Cloudinary if it exists
      if (project.cloudinaryId) {
        try {
          await cloudinary.uploader.destroy(project.cloudinaryId);
        } catch (err) {
          console.error('Error deleting old image from Cloudinary:', err);
        }
      }
      
      // Upload new image to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'portfolio_projects',
        use_filename: false,
        unique_filename: true,
      });
      
      updateData.image = result.secure_url;
      updateData.cloudinaryId = result.public_id;
    } else if (req.body.image !== undefined) {
      // If no file uploaded but image field is explicitly provided in the request body
      updateData.image = req.body.image;
    }
    // If no file is uploaded and image field is not explicitly provided, keep the existing image

    // Update the project with the new data
    project = await Project.findByIdAndUpdate(
      req.params.id, 
      updateData, 
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).json({
      success: true,
      data: project
    });
  } catch (error) {
    console.error(error);
    
    if (error.name === 'CastError') {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', ')
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private/Admin
exports.deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    // Delete the image from Cloudinary if it exists
    if (project.cloudinaryId) {
      try {
        await cloudinary.uploader.destroy(project.cloudinaryId);
      } catch (err) {
        console.error('Error deleting image from Cloudinary:', err);
      }
    }

    await project.remove();

    res.status(200).json({
      success: true,
      message: 'Project removed'
    });
  } catch (error) {
    console.error(error);
    
    if (error.name === 'CastError') {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};