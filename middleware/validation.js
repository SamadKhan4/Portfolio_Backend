// Validation middleware for common checks

const validateObjectId = (req, res, next) => {
  const { id } = req.params;
  
  // Check if id is a valid ObjectId (24 hex characters)
  if (!/^[0-9a-fA-F]{24}$/.test(id)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid ID format'
    });
  }
  
  next();
};

module.exports = { validateObjectId };