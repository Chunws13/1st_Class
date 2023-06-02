const express = require("express");
const passport = require("passport");
const { generateRefreshToken } = require("../middlewares/auth");
const { Users } = require("../models")

const router = express.Router();

const cookieOption = {
    httpOnly: true,
    sameSite: "none",
    secure: true,
    domain: "localhost",
  };  

router.get("/kakao", passport.authenticate("kakao"));

router.get(
    "/kakao/callback",
    passport.authenticate("kakao", {
        failureRedirect: "/",
    }),
    async function (req, res) {
        const { kakao_id } = req.user;
        const user = await Users.findOne({ kakao_id });
        const refreshToken = generateRefreshToken(user);

        res.cookie("refreshToken", refreshToken, cookieOption)
            .status(200)
            .redirect("/");
    }
);

router.get("/logout", (req, res) => {
    try {
        res.clearCookie("refreshToken");
        return res.status(200).json({ message: "로그아웃에 성공했습니다" });
    } catch (err) {
        res.status(500).json(err);
    }
});
module.exports = router;
