const jwt = require('jsonwebtoken');

exports.validateToken = async (req, res) => {
    const { token } = req.body;
    // Check if token is provided
    if (!token) {
       return res.status(400).json({ message: "No token provided" });
    }
 
    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
       if (err) {
          return res.status(401).json({ message: "Invalid or expired token" });
       }

       // If the token is valid, return success
       res.status(200).json({ message: "Token is valid", userId: decoded.id });
    });
};