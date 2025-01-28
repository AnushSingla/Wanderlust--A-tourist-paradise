const express = require("express");
const passport=require("passport");
const User =require("../models/user.js");
const router = express.Router();
const WrapAsync=require("../utils/WrapAsync.js")
const userController=require("../controllers/user.js")


router
.route("/signup")
.get(userController.usersignup)
.post(WrapAsync(userController.rendersignup));

router
.route("/login")
.get(userController.userlogin)
.post(passport.authenticate("local",{failureRedirect:'/login',failureFlash:true}),
userController.renderlogin)

router.get("/logout",userController.userlogout)





module.exports= router;