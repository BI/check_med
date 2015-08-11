var settings = {
	protocol: 'https',
	apiKey: process.env.OPEN_FDA_KEY,
	baseUri: "api.fda.gov",
	paths: {drugLabel: "/drug/label.json", drugRecall: "/drug/enforcement.json", drugEvent: "/drug/event.json"}
};

settings.baseUrls = {};
Object.keys(settings.paths).forEach(function(key){
	settings.baseUrls[key] = baseUrlFor(key);
});

function baseUrlFor(endPoint){
	return settings.protocol + '://' + settings.baseUri + settings.paths[endPoint];
}

module.exports = settings;