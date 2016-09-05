var assert = require('assert');
var async = require('async');
var config = require('../config');

// init schema and knex
var knex = require('knex')(config.knex);
require('./lib/schema')({knex: knex}, function(err){
	if( err ){ throw(err); }
});

var Controllers = require('./controllers');
var controllers = new Controllers({knex: knex});

var user = null;
var user2 = null;
var argument = null;
var argument2 = null;

async.series([
	// create users
	function(callback){
		controllers.user.create({}, function(err, response){
			if( err ){ return callback(err); }
			assert(response.status === 'success');
			user = response.data.user;
			callback();
		});
	},
	function(callback){
		controllers.user.create({}, function(err, response){
			if( err ){ return callback(err); }
			assert(response.status === 'success');
			user2 = response.data.user;
			callback();
		});
	},
	// create argument
	function(callback){
		controllers.argument.create({	premises: ['one', 'two', 'three'],
										user: user.id },
									function(err, response){
			assert(response.status === 'success');
			argument = response.data.argument;
			callback();
		});
	},
	// get argument
	function(callback){
		controllers.argument.get({argument: argument.id},
								 function(err, response){
			if( err ){ return callback(err); }
			assert(response.status === 'success');
			assert(response.data.argument.premises.length === 3);
			argument = response.data.argument;
			callback();
		})
	},
	// vote true for argument
	function(callback){
		controllers.argument.vote({	argument: argument.id,
									vote: true,
									user: user.id	},
								 function(err, response){
			if( err ){ return callback(err); }
			assert(response.status === 'success');
			callback();
		});
	},
	function(callback){
		controllers.argument.get({argument: argument.id},
								 function(err, response){
			if( err ){ return callback(err); }
			assert(response.data.argument.strength === 1.0);
			callback();
		});
	},
	// vote false for argument
	function(callback){
		controllers.argument.vote({	argument: argument.id,
									vote: false,
									user: user2.id	},
								 function(err, response){
			if( err ){ return callback(err); }
			assert(response.status === 'success');
			callback();
		});
	},
	function(callback){
		controllers.argument.get({argument: argument.id},
								 function(err, response){
			if( err ){ return callback(err); }
			assert(response.data.argument.strength === 0.5);
			callback();
		});
	},
	// try to vote again
	function(callback){
		controllers.argument.vote({	argument: argument.id,
									vote: false,
									user: user.id	},
								 function(err, response){
			if( err ){ return callback(err); }
			assert(response.status === 'error');
			assert(response.errorCode === 'userVoted');
			callback();
		});
	},
	// apply new argument
	function(callback){
		controllers.argument.create({	premises: ['four', 'five'],
										user: user.id,
										appliedTo: argument.id	},
									function(err, response){
			assert(response.status === 'success');
			argument2 = response.data.argument;
			return callback();
		});
	},
	function(callback){
		controllers.argument.create({	premises: ['six', 'seven'],
										user: user.id,
										appliedTo: argument.id	},
									function(err, response){
			assert(response.status === 'success');
			return callback();
		});
	},
	function(callback){
		controllers.argumentApplied.get({	argument: argument.id	},
										function(err, response){
			
			// assert(response.status === 'success');
			// return callback();
		});
	}
], function(err){
	if( err ){ return console.log(err); }
	console.log('success!!!');
});