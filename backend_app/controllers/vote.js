var _ = require('underscore');
const TABLE = 'vote';

module.exports = function(options){
	var k = options.knex;
	var c = options.controllers;
	var r = options.response;

	/**
	 * Gets user vote
	 * @param  {int}  options.user
	 * @param  {int}  options.argument
	 */
	this.get = function(options, callback){
		k(TABLE)
			.where('user', '=', options.user)
			.andWhere('argument', '=', options.argument)
			.asCallback(callback);
	}

	/**
	 * Adds user vote
	 * @param  {int}  options.user
	 * @param  {int}  options.argument
	 * @param  {boolean}  options.vote
	 */
	this.add = function(options, callback){
		k(TABLE)
			.insert(options)
			.asCallback(function(err){

			if( err ){ return callback(err); }
			return callback(null, r());
		});
	}
}