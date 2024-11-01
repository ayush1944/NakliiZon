const userModel = require("../../models/userModel"); 

async function updateUser(req, res) {
  try {
    const { userId, name, email, role } = req.body;

    const sessionUser = req.userId
    
    const user = await userModel.findById(sessionUser)

    // Construct payload with conditional properties
    const payload = {
      ...(email && {email : email }),
      ...(name && { name: name }),
      ...(role && { role : role }),
    };


    const updatedUser = await userModel.findByIdAndUpdate(userId, payload
    );

    res.json({
      data: updatedUser,
      message: "User updated successfully",
      success: true,
      error: false,
    });
  } catch (err) {
    // Handle validation errors and other types of errors
    res.status(400).json({
      message: err.message || "Error occurred during user update",
      error: true,
      success: false,
    });
  }
}

module.exports = updateUser;
