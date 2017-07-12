var mongoose = require("mongoose");

var surveySchema = mongoose.Schema({
    name: String,
    data: Array
})

module.exports = mongoose.model("bmSurvey", surveySchema);