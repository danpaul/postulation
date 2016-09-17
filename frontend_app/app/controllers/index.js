import Path from './path';
import CreatePath from './createPath';

const _ = require('underscore');
const superagent = require('superagent-cache')();
const CONTROLLERS = {
	path: Path,
	createPath: CreatePath
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