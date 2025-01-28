const User =require("../models/user.js");
module.exports.usersignup=(req,res)=>{
    res.render("users/signup.ejs")
}

module.exports.rendersignup=async(req,res)=>{
    try{
        let{username,email,password}=req.body;
        const newUser = new User({email,username})
        const registereduser = await User.register(newUser,password)
        console.log(registereduser);
        req.login(registereduser,(err)=>{
            if(err){
                return next(err)
            }
            req.flash("success","Welcome to WanderLUST")
            res.redirect("/listings")
        })
        
    }catch(e){
        req.flash("error",e.message)
        res.redirect("/listings")
    }
}

module.exports.userlogin=(req,res)=>{
    res.render("users/login.ejs")
}

module.exports.renderlogin=async(req,res)=>{
    req.flash("success","Welcome to WanderLust!")
    res.redirect("/listings")
}

module.exports.userlogout=(req,res)=>{
    req.logout((err)=>{
        if(err){
            next(err);
        }
        req.flash("success","You are logged out!")
        res.redirect("/listings")

    })
}