// server.js

var express         = require('express');
var app             = express();
var port            = process.env.PORT || 8080;
var mongoose        = require('mongoose');
var passport        = require('passport');
var flash           = require('connect-flash');
var path            = require("path");
var morgan          = require('morgan');
var cookieParser    = require('cookie-parser');
var bodyParser      = require('body-parser');
var session         = require('express-session');

//var configDB = require('./config/database.js'); //(Cloud 9)
//mongoose.connect(configDB.url); // connect to our database (Cloud 9)
mongoose.connect(process.env.CONFIGDB); // connect to our database (Heroku)


mongoose.connection.once("open", function() {
    console.log("db connected!");
})


require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms
app.use("/controllers", express.static(__dirname + "/app/controllers"))

app.set('view engine', 'ejs'); // set up ejs for templating


// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
app.use("/img", express.static(path.join(__dirname, "views/img")));
app.use("/css", express.static(path.join(__dirname, "views/css")));
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport


app.listen(port);
console.log('Listening on port ' + port);