const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken")
const router = express.Router();
const { Users } = require("../models");

router.get("/kakao", passport.authenticate("kakao"));

router.get(
    "/kakao/callback",
    passport.authenticate("kakao", {
        failureRedirect: "/",
    }),
    async(req, res) => {
        var { kakao_id } = req.user;

        const user = await Users.findOne({ where: { kakao_id } });
        const token = jwt.sign({ user_id: Users.user_id }, 'firstclass')

        res.cookie("RefreshToken", `Bearer ${token}`);
        return res
            .status(200)
            .json({ token: `Bearer ${token}`, message: "로그인 성공" });
    }
);

module.exports = router;