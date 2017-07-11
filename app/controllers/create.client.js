console.log("create.client.js running!")

$(document).ready(function() {
var optionCounter = 3;
    $("#add-option").click(function() {
        $("#options-target").append(
            
                '<div class="form-group">' +
                    '<label>Option ' + optionCounter + '</label>' +
                    '<input type="text" class="form-control" name="option-' + optionCounter + '">' +
                '</div>'
            
            
            )
            optionCounter++;
    })


})
