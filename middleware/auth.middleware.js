const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(401).json({ msg: "Please authentice!" });
    }

    const decoded = jwt.verify(token, process.env.SECRETWORD);
    req.user = decoded;
    next();
  } catch (e) {
    res.status(401).json({ msg: "Please authentice!" });
  }
};

module.exports = auth;
