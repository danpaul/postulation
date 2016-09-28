var _ = require('underscore');
var async = require('async');
const TABLE = 'vote';
const CONSTANTS = require('../constants');

module.exports = function(options){
	var c = options.controllers;
	var r = options.response;
	var m = options.models;

	/**
	 * Adds user vote
	 * @param  {int}  options.item  id of item
	 * @param  {int/string}  options.type  constant for item type or string type name
	 * @param  {int}  options.user
	 * @param  {bool}  options.true
	 */
	this.add = function(options, callback){

		var self = this;

		if( 	!options ||
				!options.item ||
				!options.type ||
				!options.user ||
				typeof(options.true) === 'undefined' ){
			return r({errorCode: 'missingOptions'}, callback);
		}

		if( !this._typeIsValid(options) ){
			return r({errorCode: 'invalidType'}, callback);
		}

		// test if user has already voted
		m.vote.get(options, function(err, votes){
			if( err ){
				console.log(err);
				return r({errorCode: 'unknown'}, callback);
			}
			if( votes.length ){
				// test if user is reversing their vote
				const voteTruth = votes[0]['true'] ? true : false;
				const newVoteTruth = options.true ? true : false;

				if( voteTruth === newVoteTruth ){
					return r({errorCode: 'userVoted'}, callback);
				}

				// if voting for path, update links and path rankings
				m.vote.reverse(options, function(err){
					if( err ){
						console.log(err);
						return r({errorCode: 'unknown'}, callback);
					}
					return r({}, callback);
				});

				
			} else {
				// if voting for path, update links and path rankings
				m.vote.add(options, function(err){
					if( err ){
						console.log(err);
						return r({errorCode: 'unknown'}, callback);
					}
					return r({}, callback);
				});
			}
		});
	}

	/**
	 * Gets user vote
	 * @param  {int}  options.item  id of item
	 * @param  {int/string}  options.type  constant for item type or string type name
	 * @param  {int}  options.user
	 * @param  {bool}  options.true
	 */
	this.get = function(options, callback){
		var self = this;
		if( 	!options ||
				!options.item ||
				!options.type ||
				!options.user ){
			return r({errorCode: 'missingOptions'}, callback);
		}
		if( !this._typeIsValid(options) ){
			return r({errorCode: 'invalidType'}, callback);
		}
		m.vote.get(options, function(err, votes){
			if( err ){
				console.log(err);
				return r({errorCode: 'unknown'}, callback);
			}
			if( votes.length ){
				return r({data: {vote: votes[0]}}, callback);
			} else {
				return r({data: {vote: null}}, callback);
			}
		});
	}

	this._typeIsValid = function(options){

		if( _.isString(options.type) ){
	        if( options.type === 'path' ){
	            options.type = CONSTANTS.types.path;
	        }else if( options.type === 'node' ){
	            options.type = CONSTANTS.types.node;
	        }else if( options.type === 'link' ){
	            options.type = CONSTANTS.types.link;
	        }
		}

		return !( 	options.type !== CONSTANTS.types.path &&
					options.type !== CONSTANTS.types.node	);
	}	
}