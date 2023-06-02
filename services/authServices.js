const AuthRepository = require("../repositories/authRepositories");

class AuthService {
    authRepository = new AuthRepository();

    login = async(kakao_id) => {
        const loginResult = await this.authRepository.login(kakao_id);
        return loginResult
    }

    logout = async() => {
        const logoutResult = await this.authRepository.logout();
        return logoutResult
    }
}

module.exports = AuthService;