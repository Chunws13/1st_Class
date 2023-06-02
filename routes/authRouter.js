const express = require("express");
const passport = require("passport");
const AuthController = require("../controllers/authControllers");
const router = express.Router();
const authController = new AuthController();

// router.get("/kakao", passport.authenticate("kakao"));
// router.get("/kakao/callback", passport.authenticate("kakao", { failureRedirect: "/" }, authController.login()));
// router.get("/logout");

//-----------------------------

module.exports = router;