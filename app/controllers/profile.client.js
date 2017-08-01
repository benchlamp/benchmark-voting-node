$(document).ready(function() {
    
    console.log("surveys.client.js running");
    
    data.forEach(function(survey) {
        console.log(survey);
        $("#survey-list").append(
            "<div class='list-group-item list-group-item-action profile-list-group-item'>" +
                "<a href='/display?id=" + survey._id + "' class='btn profile-survey-link'>" + survey.name + "</a>" +
                "<a class='btn btn-danger profile-delete-link'><span class='glyphicon glyphicon-trash'></span></a>" +
            
            "</div>"
            
            //<a href='/display?id=" + survey._id + "' >" + survey.name + "</a><button>Delete</button></div>"
            )
    })
    
})



