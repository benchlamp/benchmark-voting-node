var Survey = require("../app/models/survey");


module.exports = function(body, user) {
    
    //console.log(user.id);
    
    
    var keys = Object.keys(body);
    var data = [];
    
    keys.forEach(function(key) {
        if (key !== "name") {
            var obj = {};
            obj[body[key]] = 0;
            data.push(obj);
        }
    })
    
    var newSurvey = new Survey({
        name: body.name,
        data: data,
        user: user.id
    })

    return newSurvey.save(function(err, newSurvey) {
        if (err) console.error(err);
    })

    
}

