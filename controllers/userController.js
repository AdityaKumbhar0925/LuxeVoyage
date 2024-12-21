const User = require("../models/user.js");

module.exports.renderSignUpForm = (req, res) => {
    res.render("user/signup.ejs");
}

module.exports.signUp = async(req, res) => {
    try{
        let {username, email, password} = req.body;
        let newUser = new User({username, email });
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        req.login(registeredUser, (err) => {
            if(err){
                return next(err);
            }

            req.flash("success", "Welcome to LUXEVOYAGE!");
            res.redirect("/listings");
        });
    }catch(e){
        req.flash("error", e.message);
        res.redirect("/signup");
    }
}

module.exports.renderLogInForm = (req, res) => {
    res.render("user/login.ejs");
}

module.exports.logIn = async(req, res) => {
    req.flash("success", "Welcome Back to LUXEVOYAGE!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    // console.log(redirectUrl);
    res.redirect(redirectUrl);
}

module.exports.logOut = (req, res, next) => {
    req.logout((err) => {
        if(err){
            next(err);
        }
        else{
            req.flash("success", "You Are Logged Out!");
            res.redirect("/listings");
        }
    });
}
