var _ = require('underscore');
var async = require('async');
const TABLE = 'vote';
const CONSTANTS = require('../constants');

module.exports = function(options){
	var c = options.controllers;
	var r = options.response;
	var m = options.models;

	/**
	 * Gets user vote
	 * @param  {int}  options.user
	 * @param  {int}  options.argument
	 */
	// this.get = function(options, callback){
		// k(TABLE)
		// 	.where('user', '=', options.user)
		// 	.andWhere('argument', '=', options.argument)
		// 	.asCallback(callback);
	// }



	/**
	 * Adds user vote
	 * @param  {int}  options.item  id of item
	 * @param  {int}  options.type  constant for item type
	 * @param  {int}  options.user
	 * @param  {bool}  options.true
	 */
	this.add = function(options, callback){
		var self = this;
		if( !options ||
			!options.item ||
			!options.type ||
			!options.user ||
			!options.true ){

			return r({errorCode: 'missingOptions'}, callback);
		}

		if( options.type !== CONSTANTS.types.path &&
			options.type !== CONSTANTS.types.node ){

			return r({errorCode: 'invalidType'}, callback);
		}

		// if voting for path, update links and path rankings
		m.vote.add(options, function(err){
			if( err ){
				console.log(err);
				return r({errorCode: 'unknown'}, callback);
			}
			return r({}, callback);
		});
	}
}