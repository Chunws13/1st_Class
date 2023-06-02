const { Users } = require("../models")
const { generateRefreshToken } = require("../middlewares/auth");

const cookieOption = {
    httpOnly: true,
    sameSite: "none",
    secure: true,
    domain: "localhost",
};

class AuthRepository {

    login = async(kakao_id) => {
        const user = await Users.findOne({ kakao_id });
        const refreshToken = generateRefreshToken(user);

        res.cookie("refreshToken", refreshToken, cookieOption)
            .status(200)
            .redirect("/");
    };

    logout = async() => {
        try {
            res.clearCookie("refreshToken");
            const message = "로그아웃에 성공했습니다";
            return message;

        } catch (err) {
            const message = "로그아웃 실패!";
            return message
        }
    }
}

module.exports = AuthRepository;