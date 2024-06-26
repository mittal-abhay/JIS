const express = require('express');
const router = express.Router();
const AuthController = require('../Controllers/AuthController');   

// Register route
router.post('/register', AuthController.register);

// Login route
router.post('/login', AuthController.login);
router.get('/logout', AuthController.logout);

module.exports = router;