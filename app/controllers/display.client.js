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
                    "<div id='" + key + "." + voteName + "' class='list-group-item list-group-item-action btn vote-btn'>" + voteName + "</div>"
            );
        });
    })();
    

//==CREATE CHART================================================================

    var canvas = {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false
    };
    var title = {
        text: data.name
    };
    var tooltip = {
        pointFormat: "{series.name}: <b>{point.y}</b>"
    };
    var plotOptions = {
        pie: {
            allowPointSelect: true,
            cursor: "pointer",
            dataLabels: {
                enabled: true,
                format: "{point.name}: <b>{point.y}</b>",
                style: {
                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                }
            }
        }
    };
    var series = [{
        type: "pie",
        name: "Votes",
        data: jsonToHighchart(data.data)
    }];
    
    var json = {};
    json.canvas = canvas;
    json.title = title;
    json.tooltip = tooltip;
    json.series = series;
    json.plotOptions = plotOptions;

    var chart = Highcharts.chart("container", json);
    console.log(chart.series)
    
//==VOTE FUNCTION===============================================================
    
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