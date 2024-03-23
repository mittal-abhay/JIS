const express = require('express');
const router = express.Router();
const AuthController = require('../Controllers/AuthController');   

// Register route
router.post('/register', AuthController.register);

// Login route
router.post('/login', AuthController.login);

module.exports = router;