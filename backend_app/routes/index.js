const ROUTES = ['path'];

var _ = require('underscore');

module.exports = function(app, options){
	var self = this;
	_.each(ROUTES, function(routeName){
		var Route = require('./' + routeName);
		var route = new Route(options);
		app.use('/' + routeName, route);
	})
}