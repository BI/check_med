var request = require('superagent');

var Searcher = function() {
  //?
};

function doSearch(endPointUrl, searchString, callback, limit) {
  request
    .get(endPointUrl)
    .query({search: searchString, limit: limit})
    .end(callback);
}

// query should be an object: { fieldName: searchString }. Example: { "openfda.brand_name": "ibuprofen" }
// callback is the function to be called when the query resolves. The format is function(error, response) {}
//    To get the actual response object from the openFDA info, you need to do response.body.response
Searcher.prototype.getAll = function(endPointUrl, searchString, callback) {
  doSearch(endPointUrl, searchString, callback, 100);
};

Searcher.prototype.getFirst = function(endPointUrl, searchString, callback) {
  doSearch(endPointUrl, searchString, callback, 1);
};

Searcher.prototype.getCount = function(endPointUrl, searchString, countField, callback) {
  request
    .get(endPointUrl)
    .query({search: searchString, count: countField, limit: 1000})
    .end(callback);
};

module.exports = new Searcher();