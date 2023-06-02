const AuthServeice = require("../services/authServices"); // service 영역

class AuthController {
    authServeice = new AuthServeice();

    login = async(req, res, next) => {
        const { kakao_id } = req.user;
        const loginResult = await this.authServeice.login(kakao_id);
        res.status(200).json({ data: loginResult });
    };

    logout = async(req, res, next) => {
        const logoutResult = await this.authServeice.login();
        res.status(200).json({ data: logoutResult });
    };
}

module.exports = AuthController;