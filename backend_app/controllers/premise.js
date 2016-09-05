var _ = require('underscore');
const TABLE = 'premise';

module.exports = function(options){
	var k = options.knex;
	var c = options.controllers;
	var r = options.response;

	/**
	 * Creates a new argument
	 * @param  {Array}  options.premises
	 */
	this.create = function(options, callback){
		var count = 0;
		var premises = options.premises.map(function(premise, index){
			return {
				argument: options.argument,
				order: index,
				body: premise
			};
		})
		k(TABLE).insert(premises).asCallback(callback);
	}

	/**
	 * returns an argument's premises
	 * @param  {int}  options.argument  argument id
	 */
	this.get = function(options, callback){
		k(TABLE)
			.where('argument', '=', options.argument)
			.orderBy('order', 'asc')
			.asCallback(callback);
	}

	/**
	 * returns an argument's premises
	 * @param  {array}  options.arguments array of arguments
	 */
	this.getIn = function(options, callback){
		k(TABLE)
			.where('argument', '=', options.argument)
			.orderBy('order', 'asc')
			.asCallback(callback);
	}
}