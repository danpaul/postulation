const ROUTES = ['link', 'path', 'user', 'vote'];
const response = require('../lib/response');
const constants = require('../constants');

var _ = require('underscore');

module.exports = function(app, options){
	var self = this;
	options.response = response;
	options.constants = constants;
	_.each(ROUTES, function(routeName){
		var Route = require('./' + routeName);
		var route = new Route(options);
		app.use('/api/' + routeName, route);
	})
}