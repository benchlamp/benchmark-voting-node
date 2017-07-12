var Survey = require("../app/models/survey");

module.exports = function(id, callback) {

    Survey.findOne({_id: id}, function(err, result) {
        if (err) return console.error(err);
        callback(result);
    })

}