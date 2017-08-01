var mongoose = require("mongoose");

var surveySchema = mongoose.Schema({
    name: String,
    data: Array,
    user: String
})

module.exports = mongoose.model("bmSurvey", surveySchema);