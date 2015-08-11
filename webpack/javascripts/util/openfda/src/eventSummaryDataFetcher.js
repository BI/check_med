var ApiSearcher = require('./fdaApiSearcher');
var drugEventPath = require('../settings').baseUrls.drugEvent;

function getInPastYear(now) {
  var day = (now.getUTCDate()).toString();
  var month = (now.getUTCMonth() + 1).toString(); //month is 0 based because reasons
  var curYear = now.getUTCFullYear().toString();
  var prevYear = (now.getUTCFullYear() - 10).toString();

  day = day.length === 1 ? "0" + day : day; //fixes single digit day
  month = month.length === 1 ? "0" + month : month; //fixes single digit month

  var fromDate = prevYear + month + day;
  var toDate = curYear + month + day;

  return "{" + fromDate + " TO " + toDate + "}";
}

function makeSearchQuery(brandName) {
  var query = [];

  var years = getInPastYear(new Date());

  query.push("brand_name:\"" + brandName + "\"");
  query.push("receivedate:" + years);

  query = query.join(" AND ");

  return query;
}

/**
 * Fetches count data for 1 field
 * @param  {string}   countField  The field to count on
 * @param  {object}   valueMap    A map of labels to count values
 * @param  {string}   brandName   The name of the drug to search on
 * @param  {Function} callback    the callback to call when the data has been fetched
 * @return {void}
 */
function singleFieldCounter(countField, valueMap, brandName, callback) {
  var queryString = makeSearchQuery(brandName);

  ApiSearcher.getCount(drugEventPath, queryString, countField, onCount.bind(this, valueMap, callback));
}

function onCount(valueMap, callback, err, res) {
  var results = [];
  if(!err) {
    results = res.body.results;
  }

  var prepared = prepareResults(results);
  sendCallback(valueMap, callback, prepared);
}

function prepareResults(results) {
  var resultMap = {};
  
  results.forEach(function(result) {
    resultMap[result.term] = result.count;
  });

  return resultMap;
}

function sendCallback(valueMap, callback, preparedResults) {
  var labels = [];
  var dataValues = [];

  for(var label in valueMap) {
    var value = valueMap[label];
    var count = preparedResults[value];

    labels.push(label);
    dataValues.push(count);
  }

  var dataSet =  {
    labels: labels,
    datasets: [{
      fillColor: "rgba(21,91,131,0.5)",
      strokeColor: "rgba(21,91,131,0.8)",
      highlightFill: "rgba(21,91,131,0.75)",
      highlightStroke: "rgba(21,91,131,1)",
      data: dataValues
    }]
  };

  callback(dataSet);
}

module.exports = singleFieldCounter;