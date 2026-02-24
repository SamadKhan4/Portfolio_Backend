const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    maxlength: [1000, 'Description cannot be more than 1000 characters']
  },
  image: {
    type: String,
    required: [true, 'Image is required']
  },
  technologies: [{
    type: String,
    required: [true, 'At least one technology is required'],
    trim: true
  }],
  githubLink: {
    type: String,
    required: false,
    validate: {
      validator: function(v) {
        if (!v) return true; // Allow undefined/empty
        return /^https?:\/\/.*/.test(v);
      },
      message: 'GitHub link must be a valid URL'
    }
  },
  liveLink: {
    type: String,
    required: false,
    validate: {
      validator: function(v) {
        if (!v) return true; // Allow undefined/empty
        return /^https?:\/\/.*/.test(v);
      },
      message: 'Live link must be a valid URL'
    }
  },
  featured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true // This adds createdAt and updatedAt automatically
});

module.exports = mongoose.model('Project', projectSchema);