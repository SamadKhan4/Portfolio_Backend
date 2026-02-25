const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Set up Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: {
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
  },
  params: {
    folder: 'portfolio_projects', // Folder in Cloudinary to store images
    allowed_formats: ['jpeg', 'jpg', 'png', 'webp'],
    transformation: [{ width: 800, height: 600, crop: 'limit' }] // Limit size for optimization
  },
});

// Initialize multer with the storage engine
const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

module.exports = upload;