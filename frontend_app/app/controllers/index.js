var _ = require('underscore');
var superagent = require('superagent-cache')();

var CONTROLLERS = {
	contact: require('./contact.js'),
    menu: require('./menu.js'),
    page: require('./page.js'),
    post: require('./post.js'),
    url: require('./url.js')
}

module.exports = function(options){
	var self = this;
	_.each(CONTROLLERS, function(ControllerClass, controllerName){
		var c = new ControllerClass({	controllers: self,
										data: options.data,
										superagent: superagent,
										siteUrl: options.siteUrl	});
		self[controllerName] = c;
	});
}