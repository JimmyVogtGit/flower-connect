const jwt = require("jsonwebtoken");

const createToken = (email) => {
  return jwt.sign({ email, exp: 1659342404 }, process.env.JWT_AUTH_SECRET);
};

module.exports = createToken;
