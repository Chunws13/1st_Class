const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
    try {
        const { RefreshToken } = req.header ;

        if (!RefreshToken) {
            return res
                .status(403)
                .json({ errorMessage: "로그인이 필요한 서비스입니다." });
        }

        const [authType, authToken] = RefreshToken.split(" ");
        console.log(RefreshToken, authType, authToken);

        if (authType !== "Bearer" || !authToken) {
            return res.status(403).json({ errorMessage: "토큰 정보 오류" });
        }

        const { user_id } = jwt.verify(authToken, "firstclass");
        const user = await Users.findOne({ where: { user_id } });

        res.locals.user = user;
        next();
    } catch (error) {
        return res
            .status(500)
            .json({ errorMessage: "로그인이 필요한 서비스입니다." });
    }
};

module.exports = {
  verifyToken,
};
