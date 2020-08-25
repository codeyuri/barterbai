const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers.cookie;

  // check token
  if (!token) return res.status(401).json({ message: "Authorization denied." });

  try {
    // verify if nay token
    const decoded = jwt.verify(token, process.env.JWTSECRET);

    // add user from token
    req.user = decoded;
    next();
  } catch (e) {
    res.status(400).json({ message: "Invalid token." });
  }
};

module.exports = auth;
