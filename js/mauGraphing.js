
var mauQuery = function(){
    //display chart header
    $('#mau-chart-header').show()
    //create a line chart for Mau's
    var mauChart = $('#mau-chart').MPChart({chartType: 'line', highchartsOptions: {
      legend: {
        enabled: true,
        y: -7
      }
    }});
    //set the date params
    var params = {
      from_date: moment().subtract(5, 'month').startOf("month").format("YYYY-MM-DD"),
      to_date: moment().format("YYYY-MM-DD")
    }
    console.log(params.from_date);
    //send out mau request
    MP.api.jql(function main() {
      return Events({
        from_date: params.from_date,
        to_date: params.to_date
      })
      // group each user's events by the day they were triggered,
      // and count how many events they sent each day
      .groupByUser([function(event) {return new Date(event.time).toISOString().substr(0, 7)}], function(count, events) {
        count = count || 0;
        return count + events.length;
      })
      .groupBy(["key.1"], mixpanel.reducer.count());
    },params).done(function(results) {

    //get the last value in the results so you have the value of this months MAU's
    var thisMonthIndex = results.length - 1
    $('#mau-header').text(addCommas(results[thisMonthIndex].value));

    //transform data so that we can graph it month over month
    var mauData = transformForGraphGroupBySingleKey(results, "MAU's")

    $("#loading").hide()
    // Set the chart's data
    mauChart.MPChart('setData', mauData);
  })
}
mauQuery()
