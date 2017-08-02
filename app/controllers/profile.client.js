$(document).ready(function() {
    
    console.log("data length = " + data.length);
    

    
    if (data.length > 0) {
        $("#profile-survey-list-intro").append("<p>Here's a list of the surveys you've created</p>");
    } else {
        $("#profile-survey-list-intro").append("<p>It doesn't look like you've created any surveys yet</p>");
    }
    
    
    data.forEach(function(survey) {
        $("#survey-list").append(
            "<div class='list-group-item list-group-item-action profile-list-group-item'>" +
                "<a href='/display?id=" + survey._id + "' class='btn profile-survey-link'>" + survey.name + "</a>" +
                "<button id='" + survey._id + "' class='btn btn-danger profile-delete-link glyphicon glyphicon-trash' style='text-align:center' title='Delete survey'></button>" +
            
            "</div>"

            )
    })
    

    $(".profile-delete-link").on("click", function(event) {
      confirm("Are you sure you want to delete survey id " + event.target.id);
    })
    
})



