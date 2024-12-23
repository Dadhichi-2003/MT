const jwt = require("jsonwebtoken");

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json("Unauthorized");

  // Check if the token starts with 'Bearer '
  if (!token.startsWith("Bearer ")) return res.status(401).json("Unauthorized");

  const tokenValue = token.split(" ")[1]; // Get the actual token value

  // Verify the token
  jwt.verify(tokenValue, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json("Token has expired");
      }
      return res.status(403).json("Token is invalid");
    }
    req.user = user; // Attach the decoded user info to the request object
    next(); // Proceed to the next middleware or route handler
  });
};

module.exports = verifyToken;
