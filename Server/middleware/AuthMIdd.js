const jwt = require('jsonwebtoken');
const User = require('../models/User'); // or your User model

const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1]; // Check cookie or header

  if (!token) {
    return res.status(401).json({ message: 'No token provided, please log in' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify JWT token
    req.user = decoded.user; // Attach user data to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = authMiddleware;
