const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const { renderSignUpForm, signUp, renderLogInForm, logIn, logOut } = require("../controllers/userController.js");


//signup
router.get("/signup", renderSignUpForm);
router.post("/signup", wrapAsync(signUp));


//login
router.get("/login", renderLogInForm);
router.post("/login",saveRedirectUrl, passport.authenticate("local", {failureRedirect: "/login", failureFlash: true}) ,logIn);


//logout
router.get("/logout", logOut);


module.exports = router;