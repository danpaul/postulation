const CONTROLLERS = [
						'path',
						'user'
					];

var _ = require('underscore');
var response = require('../lib/response');

module.exports = function(options){
	var self = this;
	_.each(CONTROLLERS, function(controllerName){
		var Controller = require('./' + controllerName);
		self[controllerName] = new Controller({	controllers: self,
												response: response,
												models: options.models	});
	})
}