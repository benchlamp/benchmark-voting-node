$(document).ready(function() {
    
    
//DATA PREPARATION==============================================================
    var chart = {};
    var setup = true;
    
    function dataPrep(data) {    
        var voteData = data.data;
        var voteName = data.name;
        var keys = Object.keys(voteData);
        var prepData = [];
        
        
        keys.forEach(function(key) {
            var voteName = Object.keys(voteData[key])[0];
            var voteResult = voteData[key][voteName];
            prepData.push([voteName, voteResult]);

            if (setup) {
            //CREATE VOTE BUTTONS===================================================
            $("#vote-buttons").append(
                    "<div id='" + key + "." + voteName + "' class='list-group-item list-group-item-action btn vote-btn'>" + voteName + "</div>"
                )
            createChart(voteName, prepData);
            } else {
                return prepData;
            }  
        })
        console.log(JSON.stringify(prepData))
        setup = false;   

        
    }
//CREATE CHART==================================================================
    function createChart(voteName, prepData) {    
        chart = {
               plotBackgroundColor: null,
               plotBorderWidth: null,
               plotShadow: false
           };
           var title = {
              text: voteName   
           };      
           var tooltip = {
              pointFormat: '{series.name}: <b>{point.y}</b>'
           };
           var plotOptions = {
              pie: {
                 allowPointSelect: true,
                 cursor: 'pointer',
                 dataLabels: {
                    enabled: true,
                    format: '{series.name}: <b>{point.y}</b>',
                    style: {
                       color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                 }
              }
           };
           var series= [{
              type: 'pie',
              name: 'Votes',
              data: prepData
           }];     
              
       var json = {};   
       json.chart = chart; 
       json.title = title;     
       json.tooltip = tooltip;  
       json.series = series;
       json.plotOptions = plotOptions;
       $('#container').highcharts(json);  
    }
    
        dataPrep(data)

        console.log("data._id = " + data._id);
//VOTE BUTTON FUNCTIONS=========================================================
    $(".vote-btn").click(function(event) {
        console.log("clicked");
        $.ajax({
            url: "/display",
            type: "POST",
            data: {
                id: data._id,
                voteID: event.target.id
            },
            success: function(response) {
                if (response) {
                    //console.log(response);
                    dataPrep(response);
                    chart.series[0].setData(dataPrep(response));
                }
            }
        })
        
    })
    


})


