$(document).ready(function() {
    
    console.log("surveys.client.js running");
    
    data.forEach(function(survey) {
        console.log(survey);
        $("#survey-list").append(
            "<a href='/display?id=" + survey._id + "' class='list-group-item list-group-item-action display-list-group-item'>" + survey.name + "</a>"
            )
    })
    
})



