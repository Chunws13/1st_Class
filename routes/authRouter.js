const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.get("/kakao", passport.authenticate("kakao"));

// router.get(
//     "/kakao/callback",
//     passport.authenticate("kakao", {
//         failureRedirect: "/",
//     }),
//     async(req, res) => {
//         var { kakao_id } = req.user;
//         console.log(`테스트`+ kakao_id)
//         const user = await Users.findOne({ where: { kakao_id } });
//         var token = jwt.sign({ user_id: Users.user_id }, 'firstclass')
//         Users.user_id = req.query.user_id
//         res.send('token:'+Users.user_id)
//         //res.redirect("http://localhost:3001")
//         // return res
//         //     .status(200)
//         //     .json({ token: `Bearer ${token}`, message: "로그인 성공" })
//     }
// );

const kakaoCallback = (req, res, next) => {
    passport.authenticate(
        "kakao",
        { failureRedirect: "/" },
        (err, user, info) => {
            if (err) return next(err);
            const userId = user._id;
            const token = jwt.sign({ userId }, "firstclass");

            res.redirect("http://52.79.197.128/?token=" + token);
        }
    )(req, res, next);
};

router.get("/kakao/callback", kakaoCallback);

module.exports = router;
