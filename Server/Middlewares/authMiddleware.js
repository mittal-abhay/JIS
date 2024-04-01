// authMiddleware.js
const jwt = require('jsonwebtoken');
const config = require('../config');

// Middleware to authenticate user based on role
const authenticateRole = (roles) => (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Authorization token is required' });
  }
  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    if (!roles.includes(decoded.role)) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

// Define roles
const ROLES = {
  REGISTRAR: 'registrar',
  JUDGE: 'judge',
  LAWYER: 'lawyer'
};

module.exports = { authenticateRole, ROLES };
