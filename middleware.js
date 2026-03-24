module.exports.isLoggedIn = (req, res, next) => {
    console.log("USER:", req.user);
    console.log("AUTH:", req.isAuthenticated());

    if (!req.isAuthenticated()) {
        console.log("❌ NOT LOGGED IN");
        return res.redirect("/login");
    }

    console.log("✅ LOGGED IN");
    next();
};