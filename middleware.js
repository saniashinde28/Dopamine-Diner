module.exports.isLoggedIn = (req, res, next) => {
    console.log("USER:", req.user);
    console.log("AUTH:", req.isAuthenticated());

    if (!req.isAuthenticated()) {
        req.session.redirectUrl=req.originalUrl;
        console.log("❌ NOT LOGGED IN");
        return res.redirect("/login");
    }

    console.log("✅ LOGGED IN");
    next();
};

module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
};