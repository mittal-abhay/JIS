// userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../Controllers/UserController');
const { authenticateRole, ROLES } = require('../Middlewares/authMiddleware');

// Ensure only Registrar can access user routes
router.use(authenticateRole([ROLES.REGISTRAR]));

// Add a new judge or lawyer
router.post('/', userController.addUser);

// View all judges or lawyers
router.get('/:role', userController.getUsers);

// View a judge or lawyer by ID
router.get('/:id', userController.getUserById);

// Delete a judge or lawyer by ID
router.delete('/:id', userController.deleteUser);

module.exports = router;
