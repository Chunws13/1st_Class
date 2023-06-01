const passport = require("passport");
const KakaoStrategy = require("passport-kakao").Strategy;

const { Users } = require("../models");

module.exports = () => {
    passport.use(
        new KakaoStrategy(
            {
                clientID: process.env.KAKAO_ID,
                callbackURL: "/auth/kakao/callback",
            },
            async (accessToken, refreshToken, profile, done) => {
                console.log("kakao profile", profile);
                try {
                    const exUser = await Users.findOne({
                        where: { kakao_id: profile.id },
                    });
                    if (exUser) {
                        done(null, exUser);
                    } else {
                        const newUser = await Users.create({
                            user_name: profile.displayName,
                            kakao_id: profile.id,
                            provider: "kakao",
                        });
                        done(null, newUser);
                    }
                } catch (error) {
                    console.error(error);
                    done(error);
                }
            }
        )
    );
};
