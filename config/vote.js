var Survey = require("../app/models/survey");

module.exports = function(id, vote, callback) {


    var targetObj = {};
    targetObj["data." + vote] = 1;

    
    Survey.findOneAndUpdate(
        {_id: id},
        {$inc: targetObj},
        {upsert: true},
        function(err, data) {
            if (err) console.error(err);
            callback(true);
        }
    )

}