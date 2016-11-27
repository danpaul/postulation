import CreatePath from './createPath';
import Drawer from './drawer';
import Error from './error';
import Path from './path';
import Snackbar from './snackbar';
import User from './user';
import View from './view';
import Vote from './vote';

const _ = require('underscore');
const superagent = require('superagent-cache')();
const CONTROLLERS = {
	createPath: CreatePath,
	drawer: Drawer,
	error: Error,
	path: Path,
	snackbar: Snackbar,
	user: User,
	view: View,
	vote: Vote
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