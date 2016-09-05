var _ = require('underscore');
const TABLE = 'argument';

module.exports = function(options){
	var k = options.knex;
	var c = options.controllers;
	var r = options.response;

	/**
	 * Creates a new argument
	 * @param  {Array}  options.premises
	 * @param  {int}  options.user
	 * @param  {int}  options.user
	 * @param  {int} options.appliedTo  optional
	 */
	this.create = function(options, callback){
		// create new argument
		k(TABLE).insert({user: options.user}).asCallback(function(err, argument){
			if( err ){ return callback(err); }
			if( !argument || !argument.length ){
				return callback(new Error('Unale to create user'));
			}
			var argumentId = argument[0];
			c.premise.create({	premises: options.premises,
								argument: argumentId},
							 function(err){
				if( err ){ return callback(err); }
				var data = {argument: {id: argumentId}};
				if( !options.appliedTo ){
					return callback(null, r({data: data}));
				}
				c.argumentApplied.create({	argument: argumentId,
											appliedTo: options.appliedTo	},
					function(err){
					if( err ){ return callback(err); }
					return callback(null, r({data: data}));
				})
			});
		});
	}

	/**
	 * Gets argument by id
	 * @param  {int}  options.argument
	 * @param  {Function} callback
	 */
	this.get = function(options, callback){
		var data = {};
		k(TABLE)
			.where('argument.id', options.argument)
			.asCallback(function(err, argument){
				if( err ){ return callback(err); }
				if( !argument || !argument.length ){
					return callback(new Error('Unale to create user'));
				}
				data.argument = argument[0];
				c.premise.get({argument: argument[0]['id']},
							  function(err, premises){
					if( err ){ return callback(err); }
					data.argument.premises = premises;
					return callback(null, r({data: data}));
				});
			});
	}

	/**
	 * @param  {array}  options.arguments
	 */
	this.getIn = function(options, callback){
		k(TABLE)
			.whereIn('id', options.arguments)
			// .orderBy('ranking', 'desc')
			.orderBy('strength', 'desc')
			.asCallback(function(err, arguments){

				if( err ){ return callback(err); }

console.log(arguments);

		})
	}

	/**
	 * Updates argument vote
	 * @param  {int}  options.user
	 * @param  {int}  options.argument
	 * @param  {boolean}  options.vote
	 */
	this.vote = function(options, callback){
		c.vote.get(options, function(err, votes){
			if( err ){ return callback(err); }
			if( votes.length !== 0 ){
				return callback(null, r({errorCode: 'userVoted'}));
			}
			var q = k(TABLE).where('id', '=', options.argument);
			if( options.vote ){
				q.increment('true', 1);
			} else {
				q.increment('false', 1);
			}
			q.asCallback(function(err){
				if( err ){ return callback(err); }
				var query = 'UPDATE ' + TABLE +
							' SET strength=argument.true / (argument.true + argument.false)' +
							'WHERE id=' + options.argument;
				k.raw(query).asCallback(function(err){
					if( err ){ return callback(err); }
					c.vote.add(options, callback);
				});
			});
		});
	}
}