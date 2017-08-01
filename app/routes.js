//app/routes.js
var createSurvey = require("../config/createSurvey.js");
var listSurveys = require("../config/listSurveys.js");
var displaySurvey = require("../config/displaySurvey.js");
var displayProfile = require("../config/displayProfile.js");
var vote = require("../config/vote.js");
module.exports = function(app, passport) {
    
    
    //HOME========================================
    app.get("/", function(req, res) {
        res.redirect("/surveys");
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
    app.get("/surveys", function(req, res) {
        listSurveys(function(data) {
            res.render("surveys.ejs", {
                user: req.user,
                data: JSON.stringify(data),
                message: req.flash("loginMessage")
            });                
            
        });
    });
    
    
    //DISPLAY=====================================
    app.get("/display", function(req, res) {
        //get correct survey from db
        displaySurvey(req.query.id, function(data) {
            res.render("display.ejs", {
                user: req.user,                
                data: JSON.stringify(data)
            });
        });
    });
    
    
    app.post("/display", function(req, res) {
        vote(req.body.id, req.body.voteID, function(response) {
            if (response) {
                console.log("break routes")
                res.json(response);                
            }
        }) 
    })
    
    
    
    //CREATE======================================
    app.get("/create", isLoggedIn, function(req, res) {
        res.render("create.ejs", {
            user: req.user
        });
    });
    
    app.post("/create", isLoggedIn, function(req, res) {
        createSurvey(req.body, req.user);
        res.redirect("/surveys");

    })
    
    
    //PROFILE=====================================
    app.get("/profile", isLoggedIn, function(req, res) {
        console.log("routing user " + req.user.id + " to profile page");
        //display profile & user's surveys
        displayProfile(req.user, function(data) {
            res.render("profile.ejs", {
                user: req.user,
                data: JSON.stringify(data)                
            })
        })
        

        
    })
    
    
    
    //LOGOUT======================================
    app.get("/logout", function(req, res) {
        req.logout();
        res.redirect("/");
    })
    
    
    //TEMPLATE====================================
    app.get("/template", function(req, res) {
        res.render("template.ejs")
    })
    
};


//ROUTE MIDDLEWARE
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    console.log(req.flash)
    req.flash("loginMessage", "Please log in")
    res.redirect("/");
}