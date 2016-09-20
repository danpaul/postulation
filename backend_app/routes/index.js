const ROUTES = ['link', 'path'];
const response = require('../lib/response');

var _ = require('underscore');

module.exports = function(app, options){
	var self = this;
	options.response = response;
	_.each(ROUTES, function(routeName){
		var Route = require('./' + routeName);
		var route = new Route(options);
		app.use('/api/' + routeName, route);
	})
}