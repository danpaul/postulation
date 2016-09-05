const CONTROLLERS = [
						'argument',
						'argumentApplied',
						'premise',
						'user',
						'vote'	];

var _ = require('underscore');
var response = require('../lib/response');

module.exports = function(options){
	var self = this;
	_.each(CONTROLLERS, function(controllerName){
		var Controller = require('./' + controllerName);
		self[controllerName] = new Controller({	knex: options.knex,
												controllers: self,
												response: response	});
	})
}