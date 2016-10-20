//set params for the new user query
var params = {
    from: moment().subtract(30, 'day'),        // the earliest date you'd like to include in the query
    to: moment(),                           // the latest date you'd like to include in the query
    type: 'unique',                        // analysis type for the data, can be 'general', 'unique', or 'average'
    unit: 'day',                            // level of granularity of the data, can be 'minute', 'hour', 'day', or 'month'

    // these can be added to filter down to properties values or different groups of the segmentation query
    // 'where': 'properties["age"] == 21',     // an expression to filter by. See event filters
    // 'method': 'average',                    // string specifying a way to aggregate the results, can be 'numeric', 'sum', or 'average'
    // 'buckets': 4,                           // the number of buckets to return in a 'numeric' query
};

//create a line graph
$('#products-per-day-graph-header').show()
var productsSoldDaily = $('#products-sold-daily-graph').MPChart({chartType: 'line', highchartsOptions: {
  legend: {
    enabled: true,
    y: -7
  }
}});
MP.api.segment('$custom_event:88159', params).done(function(results){
  //store results data
  var data = results.values()
  //get today's new user value
  $('#products-sold').text(addCommas(data['$custom_event:88159'][moment().format('YYYY-MM-DD')]));
  //little data transformation so that we have the objec property of "New Users" so that is the label that shows when we graph
  var charData = {}
  charData["Products Sold"] = data['$custom_event:88159']
  //transfor the results data so that it can be put in a chart
  var tableData = transformDataforDataTables(results.values())

  productsSoldDaily.MPChart('setData', charData);
  //graph the same data in a table

  $('#products-day-table').DataTable( {
        data: tableData,
        dom: 'Bfrtip',
        lengthMenu: [
          [ 6, 25, 50, -1 ],
          [ '6 rows', '25 rows', '50 rows', 'Show all' ]
        ],
        buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print', 'pageLength'
        ]
  } );
  $('#products-day-table').show()
})

//set params for the new user query
var params2 = {
    from: moment().subtract(5, 'month').startOf('month'),        // the earliest date you'd like to include in the query
    to: moment(),                           // the latest date you'd like to include in the query
    type: 'unique',                        // analysis type for the data, can be 'general', 'unique', or 'average'
    unit: 'month',                            // level of granularity of the data, can be 'minute', 'hour', 'day', or 'month'

    // these can be added to filter down to properties values or different groups of the segmentation query
    // 'where': 'properties["age"] == 21',     // an expression to filter by. See event filters
    // 'method': 'average',                    // string specifying a way to aggregate the results, can be 'numeric', 'sum', or 'average'
    // 'buckets': 4,                           // the number of buckets to return in a 'numeric' query
};

//create a line graph
$('#products-per-month-graph-header').show()
var productSoldPerMonth = $('#products-sold-monthly-graph').MPChart({chartType: 'line', highchartsOptions: {
  legend: {
    enabled: true,
    y: -7
  }
}});
MP.api.segment('$custom_event:88159', params2).done(function(results){
  //store results data
  var data = results.values()
  //little data transformation so that we have the objec property of "New Users" so that is the label that shows when we graph
  var charData = {}
  charData["Products Sold"] = data['$custom_event:88159']
  //transfor the results data so that it can be put in a chart
  var tableData = transformDataforDataTables(results.values())

  productSoldPerMonth.MPChart('setData', charData);
  //graph the same data in a table

  $('#products-per-month-table').DataTable( {
        data: tableData,
        dom: 'Bfrtip',
        lengthMenu: [
          [ 6, 25, 50, -1 ],
          [ '6 rows', '25 rows', '50 rows', 'Show all' ]
        ],
        buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print', 'pageLength'
        ]
  } );
  $('#products-sold-monthly-graph').show()
})
