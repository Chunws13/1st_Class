const express = require("express");
const passport = require("passport");
const { generateToken } = require("../middlewares/auth");
const router = express.Router();

router.get("/kakao", passport.authenticate("kakao"));

const kakaoCallback = (req, res, next) => {
    passport.authenticate(
        "kakao",
        { failureRedirect: "/" },
        (err, user, info) => {
            if (err) return next(err);

            req.user = user;
            next();
        }
    )(req, res, next);
};

router.get("/kakao/callback", kakaoCallback, generateToken, (req, res) => {
    const token = res.locals.token;

    res.redirect("http://52.79.197.128/?token=" + token);
});

module.exports = router;
