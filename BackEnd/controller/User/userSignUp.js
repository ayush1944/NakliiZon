const multer = require('multer');
const bcrypt = require('bcryptjs');
const userModel = require('../../models/userModel');
const roles = require('../../roles'); // Adjust the path if necessary

// Set up multer for file upload
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png'];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error('Invalid file type'));
    }
    cb(null, true);
  }
}).single('profilePic');

async function userSignUpController(req, res) {
  const processFileUpload = () =>
    new Promise((resolve, reject) => {
      upload(req, res, function (err) {
        if (err) {
          return reject(new Error('Error uploading file'));
        }
        resolve();
      });
    });

  try {
    // Wait for the file upload to finish
    await processFileUpload();

    const { email, password, name } = req.body;
    const profilePic = req.file; // Uploaded file

    // Validation
    if (!email || !password || !name) {
      return res.status(400).json({ message: 'Please provide all required fields', error: true, success: false });
    }

    // Check if the user already exists
    const user = await userModel.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists', error: true, success: false });
    }

    // Hash the password
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    if (!hashPassword) {
      throw new Error('Password hashing failed');
    }

    // Create the payload for the new user
    const payload = {
      ...req.body,
      role: roles.GENERAL,
      password: hashPassword
    };

    // Add profile picture if uploaded
    if (profilePic) {
      payload.profilePic = profilePic.buffer.toString('base64'); // Save as base64 string
    }

    console.log('Payload:', payload);

    // Save the new user
    const userData = new userModel(payload);
    const saveUser = await userData.save();

    // Respond with success
    return res.status(201).json({
      data: saveUser,
      success: true,
      error: false,
      message: 'User created successfully',
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: err.message || 'Something went wrong, please try again',
      error: true,
      success: false,
    });
  }
}

module.exports = userSignUpController;
