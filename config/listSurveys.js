var Survey = require("../app/models/survey");

 
module.exports = function(foo) {
    Survey.find(function(err, surveys) {
        if (err) return console.error(err);
         foo(surveys);
    }) 
}