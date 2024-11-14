const jwt = require('jsonwebtoken');
require('dotenv').config();

const extractUserId = (req, res, next) => {
  try {
    // Get the token from the Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authorization token missing or invalid' });
    }

    // Extract the token
    const token = authHeader.split(' ')[1];

    // Log the secret key directly from the environment variable
    const secretKey = process.env.JWT_SECRET; 

    if (!secretKey) {
      return res.status(500).json({ message: 'JWT_SECRET not found in environment variables' });
    }

    // Verify the token using the secret key
    const decodedToken = jwt.verify(token, secretKey);

    // Extract the userId from the decoded token and attach it to the request object
    req.userId = decodedToken.id; // Adjust based on your token structure

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    res.status(401).json({ message: 'Token verification failed', error: error.message });
  }
};

// Use module.exports to export the middleware
module.exports = extractUserId;
