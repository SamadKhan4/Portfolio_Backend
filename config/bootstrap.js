const Admin = require('../models/Admin');

const createDefaultAdmin = async () => {
  try {
    // Use environment variables or defaults
    const defaultUsername = process.env.ADMIN_USERNAME || 'admin';
    const defaultEmail = process.env.ADMIN_EMAIL || 'admin@portfolio.com';
    const defaultPassword = process.env.ADMIN_PASSWORD || 'admin123';
    
    const existingAdmin = await Admin.findOne({ username: defaultUsername });
    
    if (existingAdmin) {
      console.log('Admin user already exists');
      return;
    }
    
    const defaultAdmin = new Admin({
      username: defaultUsername,
      email: defaultEmail,
      password: defaultPassword
    });
    
    await defaultAdmin.save();
    console.log('Default admin user created:');
    console.log(`Username: ${defaultUsername}`);
    console.log(`Password: ${defaultPassword}`);
    console.log(`Email: ${defaultEmail}`);
  } catch (error) {
    console.error('Error creating default admin:', error.message);
  }
};

module.exports = { createDefaultAdmin };