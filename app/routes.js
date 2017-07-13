//app/routes.js
var createSurvey = require("../config/createSurvey.js");
var listSurveys = require("../config/listSurveys.js");
var displaySurvey = require("../config/displaySurvey.js");
var vote = require("../config/vote.js");
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
    app.get("/surveys", function(req, res) {
        
        listSurveys(function(data) {
            console.log(data);
            res.render("surveys.ejs", {
                user: req.user,
                data: JSON.stringify(data)
            });                
            
        });

    });
    
    
    //DISPLAY=====================================
    app.get("/display", function(req, res) {
        //get correct survey from db
        displaySurvey(req.query.id, function(data) {
            res.render("display.ejs", {
                data: JSON.stringify(data)
            });
        });
    });
    
    
    app.post("/display", function(req, res) {
        vote(req.body.id, req.body.voteID, function(response) {
            if (response) {
                res.send(true);                
            }
        }) 
        



    })
    
    
    
    //CREATE======================================
    app.get("/create", function(req, res) {
        res.render("create.ejs", {
            user: req.user
        });
    });
    
    app.post("/create", function(req, res) {
        createSurvey(req.body);
        res.redirect("/surveys");
        
    })
    
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