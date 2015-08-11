var React = require('react');
var App = require('./App.jsx');

document.addEventListener('DOMContentLoaded', function() {
	React.render(
		<App />,
		document.getElementById("app-entry-point")
	);
});
