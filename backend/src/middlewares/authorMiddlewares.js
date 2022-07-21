const verifyToken = require("../services/verifyToken");

function author(req, res, next) {
  if (!req.headers.cookie) {
    res.status(401).send("unauthorized, no token ");
  } else {
    const token = req.headers.cookie.split("=")[1];

    const tokenVerified = verifyToken(token);

    if (!tokenVerified) {
      res.status(401).send("unauthorized, bad token");
      return;
    }

    next();
  }
}

module.exports = author;
