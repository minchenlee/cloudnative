import jwt from 'jsonwebtoken';

// Define the middleware function as an arrow function
const isAuth = (req, res, next) => {
  // Get the authorization header from the request
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'Unauthorized: Missing authorization header' });
  }
  const tokenParts = authHeader.split(' ');

  // Check if the header format is correct
  if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
    return res.status(401).json({ message: 'Unauthorized: Invalid authorization header format' });
  }


  const token = tokenParts[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }

    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  });
};

export default isAuth;
