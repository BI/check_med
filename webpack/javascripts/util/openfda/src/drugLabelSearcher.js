var ApiSearcher = require('./fdaApiSearcher');
var luceneQueryString = require('./luceneConvenience').multiFieldFragmentSearch;
var settings = require('../settings');

var fields = ['brand_name', 'generic_name', 'manufacturer_name'];

module.exports = {
	getAll: function(value, callback){
    var query = luceneQueryString(value, fields);
		ApiSearcher.getAll(settings.baseUrls.drugLabel, query, callback);
	},
	getFirst: function(value, callback){
    var query = luceneQueryString(value, fields);
		ApiSearcher.getFirst(settings.baseUrls.drugLabel, query, callback);
	},
  getRecallById: function(splId, callback) {
    var query = 'openfda.spl_id:"' + splId + '"';
    ApiSearcher.getFirst(settings.baseUrls.drugRecall, query, callback);
  }
};