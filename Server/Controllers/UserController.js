// userController.js
const User = require('../Models/User');
const bcrypt = require('bcrypt');
// API to add a new judge or lawyer (for registrar)
exports.addUser = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    // Check if username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the saltRounds

    // Create a new user with hashed password
    const newUser = new User({
      username,
      password: hashedPassword, // Save hashed password
      role
    });
    
    await newUser.save();

    res.status(201).json({ message: 'User added successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// API to view all judges or lawyers (for registrar)
exports.getUsers = async (req, res) => {
  try {
    const { role } = req.params;
    const users = await User.find({ role });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// API to view a judge or lawyer by ID (for registrar)
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// API to delete a judge or lawyer by ID (for registrar)
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
