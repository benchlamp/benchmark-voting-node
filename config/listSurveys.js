var Survey = require("../app/models/survey");

 
module.exports = function(callback) {
    Survey.find(function(err, surveys) {
        if (err) return console.error(err);
         callback(surveys);
    }) 
}