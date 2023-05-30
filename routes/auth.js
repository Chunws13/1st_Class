const express = require("express");
const passport = require("passport");
const querystring = require("querystring");

const router = express.Router();

router.get("/logout", (req, res, next) => {
    req.logOut((err) => {
        if (err) {
            return next(err);
        } else {
            console.log("로그아웃됨.");
            res.redirect("/");
        }
    });
});

router.get("/kakao", passport.authenticate("kakao"));

router.get(
    "/kakao/callback",
    passport.authenticate("kakao", {
        failureRedirect: "/",
    }),
    (req, res) => {
        var userData = req.user;
        console.log(userData);
        const query = querystring.stringify({
            user_id: userData.user_id,
            accessToken: userData.accessToken,
            refreshToken: userData.refreshToken,
            user_name: userData.user_name,
            local: false,
        });
        console.log(query);
        res.redirect("/");
    }
);

module.exports = router;
