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
  //query.push("serious:1");
  query.push("receivedate:" + years);

  query = query.join(" AND ");

  return query;
}

//dataMap: {"Label For Graph": "countfield", /* ... */}
var dataFetcher = function(dataMap, brandName, callback) {
  var data = [];
  var labels = [];
  var countFields = [];

  for(var label in dataMap) {
    data.push(null);
    labels.push(label);
    countFields.push(dataMap[label]);
  }

  this.data = data;
  this.labels = labels;
  this.countFields = countFields;

  this.brandName = brandName;
  this.callback = callback;
  this.isDone = false;

  var query = makeSearchQuery(brandName);

  for(var index in countFields) {
    var countField = this.countFields[index];
    var onCount = this.addData.bind(this, index);

    ApiSearcher.getCount(drugEventPath, query, countField, onCount);
  }
};

dataFetcher.prototype.addData = function(index, err, res) {
  var count = 0; //unsure if default should be 0 or undefined. Leaving as 0 so it will do something.

  if(!err) {
    count = res.body.results[0].count;
  }

  this.data[index] = count;
  this.sendCallback();
};

dataFetcher.prototype.sendCallback = function() {
  for (var i in this.data) {
    if(this.data[i] === null) {
      return; //if there is no data yet, bounce out, don't send recall
    }
  }

  var dataSet =  {
    labels: this.labels,
    datasets: [{
      label: "Serious Events",
      fillColor: "rgba(21,91,131,0.5)",
      strokeColor: "rgba(21,91,131,0.8)",
      highlightFill: "rgba(21,91,131,0.75)",
      highlightStroke: "rgba(21,91,131,1)",
      data: this.data
    }]
  };

  if(!this.isDone) {
    this.callback(dataSet);
    this.isDone = true;
  }
};

function runDataFetcher(dataMap, brandName, callback) {
  new dataFetcher(dataMap, brandName, callback);
}

module.exports = runDataFetcher;
module.exports._getInPastYear = getInPastYear;