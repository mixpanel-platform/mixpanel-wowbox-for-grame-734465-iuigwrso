//formatting to add commas to numbers
function addCommas(intNum) {
  return (intNum + '').replace(/(\d)(?=(\d{3})+$)/g, '$1,');
}

//apply data to dataSet variable
function graphValues(eventParam, count){ // helper function for ordering data for marketing table

  _.each(eventParam, function(value, key){ //for top event
    _.each(dataSet, function(datasetValue, datasetKey){
      if(key === datasetValue[0]){
        dataSet[datasetKey][count] = addCommas(value)
        if (eventParam = eventsByCampaign){

        }
      }
    })
  })
}

//results  are the jql results
//valuename is the name of the value you are graphing and will show up as the title of the data when you hover over a data point in the graph. Should be a string
function transformForGraphGroupBySingleKey(results, valuename){
  var obj = {}
  _.each(results, function(value, key){
    obj[value.key[0]] = value.value
  })
  var graphData = {}
  graphData[valuename] = obj
  return graphData
}
//use when you need to get data formatted for use in a datatables table. should be able to just pass in results.values() as the param
function transformDataforDataTables(data){
  var tableData = []
  var position = 0
  _.each(data, function(values){
    _.each(values, function(counts, key){
      tableData[position] = [key, addCommas(counts)]
      position ++
    })
  })
  return tableData
}
