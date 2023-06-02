const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;
  
    if (authHeader) {
      const token = authHeader;
      jwt.verify(token, process.env.JWT_SEC, (err, user) => {
        if (err) res.status(403).json({ message: "유효하지 않은 토큰입니다!" });
        req.user = user;
        next();
      });
    } else {
      return res.status(401).json({ message: "권한이 없습니다!" });
    }
  };

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json({ message: "올바르지 않은 접근입니다!" });
    }
  });
};

module.exports = {
  generateRefreshToken,
  verifyToken,
  verifyTokenAndAuthorization,
};
