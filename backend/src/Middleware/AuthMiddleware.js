const jwt = require("jsonwebtoken");

const ensureAuthenticated = (req, res, next) => {
  const auth = req.headers["authorization"];

  if (!auth) {
    return res.status(403).json({ msg: "unauthorized , jwt token is require" });
  }

  try {
    const decoded = jwt.verify(auth, process.env.jwt_secret);
    req.user = decoded;
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ msg: "unauthorized , jwt token is wrong or expire" });
  }
};

module.exports = ensureAuthenticated;
