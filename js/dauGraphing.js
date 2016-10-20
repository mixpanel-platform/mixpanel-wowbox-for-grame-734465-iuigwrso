var dauQuery = function(){
    $("#dau-chart-header").show()           //display chart header
    //create the graph
    var mdauChart = $('#dau-chart').MPChart({chartType: 'line', highchartsOptions: {  // Create a line chart
      legend: {
        enabled: true,
        y:-7
      },
    }});
    //set the date params
    var params = {
      from_date: moment().startOf('month').format("YYYY-MM-DD"),
      to_date: moment().format("YYYY-MM-DD")
    }

    MP.api.jql(function main() {
      return Events({
        from_date: params.from_date,
        to_date: params.to_date
      })
      // group each user's events by the day they were triggered,
      // and count how many events they sent each day
      .groupByUser([function(event) {return new Date(event.time).toISOString().substr(0, 10)}], function(count, events) {
        count = count || 0;
        return count + events.length;
      })
      .groupBy(["key.1"], mixpanel.reducer.count());
    },params)
    .done(function(results) {
      console.log("dau results", results);
      //get index of today's dau's for graphing
      var dauToday = results.length - 1
      dauToday = results[dauToday].value
      // graph dau's today
      $('#dau-header').text(addCommas(dauToday));

      //transform data for graph
      var graphdata = transformForGraphGroupBySingleKey(results, "Dau's")

      $("#loading").hide()
      mdauChart.MPChart('setData', graphdata); // Set the chart's data

    })
    //set a timer to refresh the graph
    setTimeout(dauQuery,3600000)
}
dauQuery();
