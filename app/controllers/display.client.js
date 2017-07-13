$(document).ready(function() {
    
    
//DATA PREPARATION==============================================================
    voteData = data.data;
    console.log(voteData);
    var keys = Object.keys(voteData);
    var prepData = [];
    
    keys.forEach(function(key) {
        var voteName = Object.keys(voteData[key])[0];
        var voteResult = voteData[key][voteName];
        prepData.push([voteName, voteResult]);
        
        //CREATE VOTE BUTTONS===================================================
        $("#vote-buttons").append(
                "<div id='" + key + "." + voteName + "' class='list-group-item list-group-item-action btn vote-btn'>" + voteName + "</div>"
            )
        
    })

    createChart();

//CREATE CHART==================================================================
    function createChart() {    
        var chart = {
               plotBackgroundColor: null,
               plotBorderWidth: null,
               plotShadow: false
           };
           var title = {
              text: data.name   
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


//VOTE BUTTON FUNCTIONS=========================================================
    $(".vote-btn").click(function(event) {
        //console.log("survey id: " + data._id)
        //console.log("vote id: " + event.target.id);
        

        $.ajax({
            url: "/display",
            type: "POST",
            data: {
                id: data._id,
                voteID: event.target.id
            },
            success: function(response) {
                if (response) createChart();
            }
        })
        
    })

})


