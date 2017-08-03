var Survey = require("../app/models/survey");

module.exports = function(id, user, callback) {

    Survey.findByIdAndRemove(id, function(err, result) {
        if (err) return console.error(err);
        console.log("deleteSurvey.js: delete successful")
        
        
        Survey.find({user: user.id}, function(err, result) {
            if (err) return console.error(err);
            callback(result);
        })
        
        
    })

}