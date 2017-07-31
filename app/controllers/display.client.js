//data needed in format [["Blue",2],["Red",4]]

$(document).ready(function() {
    
//==FORMAT DATA FOR HIGHCHARTS==================================================
    
    function jsonToHighchart(json) {
        var result = [];
        
        for (var i = 0; i < json.length; i++) {
            var key = Object.keys(json[i])[0];
            var val = json[i][key]
            result.push([key, val]);
        };
            return result;
    } ; 



//==CREATE VOTE BUTTONS=========================================================
    
    (function createVoteButtons() {
        var voteData = data.data;
        var keys = Object.keys(voteData);
        
        keys.forEach(function(key) {
            var voteName = Object.keys(voteData[key])[0];
            var voteResult = voteData[key][voteName];
            
            $("#vote-buttons").append(
                    //"<div id='" + key + "." + voteName + "' class='list-group-item list-group-item-action btn vote-btn accent-color text-primary-color'>" + voteName + "</div>" +
            
                    "<div class='custom-button'>" +
                        "<div class='custom-button-slider'><p>Thank you for voting</p></div>" +
                        
                        "<div class='custom-button-option'>" +
                            "<span class='custom-button-option-name'>" + voteName + "</span>" +
                        "</div>" +
                        
                        "<button class='custom-button-submit vote-btn' id='" + key + "." + voteName + "'>Vote</button>" +
                    
                    
                    "</div>"
            
            );
        });
    })();
    

//==CREATE CHART================================================================

    var chart = {
        plotBackgroundColor: "#f7f9f8",
        plotBorderWidth: null,
        plotShadow: false,
        backgroundColor: "#f7f9f8"
    };
    var credits = {
        enabled: false    
    };
    var title = {
        text: data.name,
        style: {
            fontSize: "30px"
        }
    };
    var tooltip = {
        pointFormat: "{series.name}: <b>{point.y}</b>"
    };
    var plotOptions = {
        pie: {
            allowPointSelect: true,
            cursor: "pointer",
            dataLabels: {
                enabled: false,
                format: "{point.name}: <b>{point.y}</b>",
                style: {
                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                }
            },
            showInLegend: true
        }
    };
    var series = [{
        type: "pie",
        name: "Votes",
        data: jsonToHighchart(data.data)
    }];
    
    var json = {};
    json.chart = chart;
    json.credits = credits;
    json.title = title;
    json.tooltip = tooltip;
    json.series = series;
    json.plotOptions = plotOptions;

    var chart = Highcharts.chart("container", json);

    
//==VOTE FUNCTION===============================================================
 
    $(".custom-button-submit").on("click", function() {
        $(".custom-button-slider").toggleClass("slide");
    })
 
    
    $(".vote-btn").click(function(event) {
        $.ajax({
            url: "/display",
            type: "POST",
            data: {
                id: data._id,
                voteID: event.target.id
            },
            success: function(response) {
                chart.series[0].setData(jsonToHighchart(response.data));
            }
        })
        
    })
    
    
//END===========================================================================
    
}); //end document ready