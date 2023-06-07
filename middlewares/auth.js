const jwt = require("jsonwebtoken");

const generateToken = (req, res, next) => {
    const user = req.user; 
    const user_id = user._id;
    const token = jwt.sign({ user_id }, "firstclass", {expiresIn: '30m'});

    res.locals.token = token;

    next();
}

const verifyToken = (req, res, next) => {
  // 인증 완료
  try {
      req.decoded = jwt.verify(req.headers.refreshtoken, "firstclass");
      return next();
  }
  // 인증 실패
  catch (error) {
      // 유효시간이 초과된 경우
      if (error.name === 'TokenExpiredError') {
          return res.status(419).json({
              code: 419,
              message: '토큰이 만료되었습니다.'
          });
      }
      // 토큰의 비밀키가 일치하지 않는 경우
      if (error.name === 'JsonWebTokenError') {
          return res.status(401).json({
              code: 401,
              message: '유효하지 않은 토큰입니다.'
          });
      }
  }
}


module.exports = {
    generateToken,
    verifyToken,
};
