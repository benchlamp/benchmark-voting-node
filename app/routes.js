//app/routes.js
module.exports = function(app, passport) {
    
    
    //HOME========================================
    app.get("/", function(req, res) {
        res.render("index.ejs");
    })
    
    
    //LOGIN=======================================
    app.get("/login", function(req, res) {
        res.render("login.ejs", { message: req.flash("loginMessage") });
    })
    
    
    app.post("/login", passport.authenticate("login", {
        successRedirect: "/surveys",
        failureRedirect: "/login",
        failureFlash: true
    }))
    
   
   
   //SIGNUP=======================================
    app.get("/signup", function(req, res) {
        res.render("signup.ejs", { message: req.flash("signupMessage") });
    });
    
    
    app.post("/signup", passport.authenticate("signup", {
        successRedirect: "/surveys",
        failureRedirect: "/signup",
        failureFlash: true
    }));
    
    
    //SURVEYS=====================================
    app.get("/surveys", isLoggedIn, function(req, res) {
        res.render("surveys.ejs", {
            user: req.user
        });
    });
    
    
    //DISPLAY=====================================
    app.get("/display", function(req, res) {
        res.send(req.query.id);
    })
    
    
    //CREATE======================================
    app.get("/create", function(req, res) {
        res.render("create.ejs");
    });
    
    
    
    //LOGOUT======================================
    app.get("/logout", function(req, res) {
        req.logout();
        res.redirect("/");
    })
};


//ROUTE MIDDLEWARE
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/");
}