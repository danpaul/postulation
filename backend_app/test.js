var assert = require('assert');
var async = require('async');
var config = require('../config');

// init schema and knex
var knex = require('knex')(config.knex);
require('./lib/schema')({knex: knex}, function(err){
	if( err ){ throw(err); }
});

var Models = require('./models');
var models = new Models({knex: knex});

var Controllers = require('./controllers');
var controllers = new Controllers({models: models});

const CONSTANTS = require('./constants');

var user = null;
var path = null;
var path2 = null;
var path3 = null;
var path4 = null;
var path5 = null;
var fullPath = null;
var fullPath2 = null;
var fullPath4 = null;

async.series([
	// create users
	function(callback){
		controllers.user.create({}, function(err, response){
			if( err ){ return callback(err); }
			assert(response.status === 'success');
			assert(response.data.user);
			user = response.data.user;
			callback();
		});
	},
	// create path
	function(callback){
		controllers.path.create({nodes: ['one', 'two', 'three'], user: user.id},
							    function(err, response){
			if( err ){ return callback(err); }
			assert(response.status === 'success');
			assert(response.data.path);
			path = response.data.path;
			callback();
		});
	},
	// get path
	function(callback){
		controllers.path.get({id: path.id}, function(err, response){
			if( err ){ return callback(err); }
			assert(response.status === 'success');
			assert(response.data.path.path.length === 5);
			fullPath = response.data.path;
			callback();
		});
	},
	// create path using existing nodes
	function(callback){
		var node1 = fullPath.path[0];
		var node2 = fullPath.path[2];
		controllers.path.create({nodes: [node1, 'foo', node2], user: user.id},
							    function(err, response){
			if( err ){ return callback(err); }
			assert(response.status === 'success');
			assert(response.data.path);
			path2 = response.data.path;
			callback();
		});
	},
	// get second path
	function(callback){
		controllers.path.get({id: path2.id}, function(err, response){
			if( err ){ return callback(err); }
			assert(response.status === 'success');
			callback();
		});
	},
	// add path that ends at link
	function(callback){
		var link = fullPath.path[1];
		controllers.path.create({nodes: ['biz', 'bap', link], user: user.id},
							    function(err, response){
			if( err ){ return callback(err); }
			assert(response.status === 'success');
			assert(response.data.path);
			path3 = response.data.path;
			callback();
		});
	},

	function(callback){
		controllers.path.get({id: path3.id}, function(err, response){
			if( err ){ return callback(err); }
			assert(response.status === 'success');
			assert(response.data.path.path[4]['type'] === 'link');
			callback();
		});
	},

	// create path as a response, w/postive/negative charge
	function(callback){
		var node1 = fullPath.path[0];
		controllers.path.create({nodes: ['zip', 'zap', 'zoom', node1],
								 user: user.id,
								 charge: false},
							    function(err, response){
			if( err ){ return callback(err); }
			assert(response.status === 'success');
			path4 = response.data.path;
			callback();
		});
	},

	function(callback){
		controllers.path.get({id: path4.id}, function(err, response){
			if( err ){ return callback(err); }
			assert(response.status === 'success');
			callback();
		});
	},

	// get responses to node1
	function(callback){
		var node1 = fullPath.path[0];
		controllers.link.getResponses({node: node1}, function(err, response){
			if( err ){ return callback(err); }
			assert(response.status === 'success');
			assert(response.data.paths[0]['id'] === path4.id );
			callback();
		});
	},

	// create response to link
	function(callback){
		var link = fullPath.path[1];
		controllers.path.create({nodes: ['ding', 'dong', link],
								 user: user.id,
								 charge: false},
							    function(err, response){
			if( err ){ return callback(err); }
			assert(response.status === 'success');
			path5 = response.data.path;
			callback();
		});
	},
	function(callback){
		controllers.path.get({id: path5.id}, function(err, response){
			if( err ){ return callback(err); }
			assert(response.status === 'success');
			callback();
		});
	},
	function(callback){
		var link = fullPath.path[1];
		controllers.link.getResponses({link: link}, function(err, response){
			if( err ){ return callback(err); }
			assert(response.status === 'success');
			assert(response.data.paths[0]['id'] === path5.id );
			callback();
		});
	},
	// vote for path
	function(callback){
		controllers.vote.add({
			item: path.id,
			type: CONSTANTS.types.path,
			user: user.id,
			true: true
		}, function(err, response){
			if( err ){ return callback(err); }
			assert(response.status === 'success');
			callback();
		});
	},
	function(callback){
		controllers.path.get({id: path.id}, function(err, response){
			if( err ){ return callback(err); }
			assert(response.status === 'success');
// console.log(response.data.path);
			callback();
		});
	}

], function(err){
	if( err ){ return console.log(err); }
	console.log('success!!!');
});