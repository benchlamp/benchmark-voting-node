var Survey = require("../app/models/survey");

module.exports = function(user, callback) {
    console.log("user.id = " + user.id);
    Survey.find({user: user.id}, function(err, result) {
        if (err) return console.error(err);
        console.log(result)
        callback(result);
    })

}