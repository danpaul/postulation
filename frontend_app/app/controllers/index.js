import CreatePath from './createPath';
import Path from './path';
import User from './user';

const _ = require('underscore');
const superagent = require('superagent-cache')();
const CONTROLLERS = {
	createPath: CreatePath,
	path: Path,
	user: User
};

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