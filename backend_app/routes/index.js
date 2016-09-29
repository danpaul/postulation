const ROUTES = ['link', 'path', 'user', 'vote'];
var _ = require('underscore');

module.exports = function(app, options){

	options.response = require('../lib/response');
	options.constants = require('../constants');
	options.validation = new(require('../lib/validation'));

	_.each(ROUTES, function(routeName){
		var Route = require('./' + routeName);
		var route = new Route(options);
		app.use('/api/' + routeName, route);
	})
}