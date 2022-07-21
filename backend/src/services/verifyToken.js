const jwt = require("jsonwebtoken");

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_AUTH_SECRET, (err, decoded) => {
    if (err) {
      return false;
    }

    return decoded.email;
  });
};

module.exports = verifyToken;
