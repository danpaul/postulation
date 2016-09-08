var _ = require('underscore');
var async = require('async');
const TABLE = 'vote';
const CONSTANTS = require('../constants');

module.exports = function(options){
	var k = options.knex;

	/**
	 * Adds user vote
	 * @param  {int}  options.item  id of item
	 * @param  {int}  options.type  constant for item type
	 * @param  {int}  options.user
	 * @param  {bool}  options.true
	 */
	this.add = function(options, callback){
		var self = this;
		var table = null;
		if( options.type === CONSTANTS.types.path ){
			table = 'path';
		} else if( options.type === CONSTANTS.types.node ){
			table = 'node';
		} else {
			return callback(new Error('Invalid type'));
		}

		async.series([

			// add vote to vote log
			function(callback){
				// add vote to log
				k(TABLE).insert(options).asCallback(callback);
			},
			// increment true/false
			function(callback){
				var q = k(table).where('id', '=', options.item);
				if( options.true ){ q.increment('true', 1);
				} else { q.increment('false', 1); }
				q.asCallback(callback);
			},
			function(callback){
				k(table)
					.where('id', '=', options.item)
					.increment('total', 1)
					.asCallback(callback);
			},
			function(callback){
					var query = self._getUpdateQuery(table, options.item);
					k.raw(query).asCallback(function(err){
						if( err ){ return callback(err); }
						if( options.type !== CONSTANTS.types.path ){
							return callback();
						}
						// update links strength
						self._updateNodesStrength({path: options.item}, callback);
					});
			}
		], callback);
	}

	this._getUpdateQuery = function(table, id){
		return 'UPDATE ' + table + ' ' +
				'SET strength=' + table + '.true / (' + table + '.true + ' + table + '.false)' +
				'WHERE id=' + id;
	}

	this._getLinkUpdateQuery = function(table, id){
		return 'UPDATE link ' +
				'SET strength=' + table + '.true / (' + table + '.true + ' + table + '.false)' +
				'WHERE id=' + id;
	}

	this._updateNodesStrength = function(options, callback){
		k('path').where('id', options.path)
			.asCallback(function(err, path){
				if( err ){ return callback(err); }
				if( !path || !path.length ){
					return callback(new Error('Could not find path'));
				}
				var strength = path[0]['strength'];
				k('link')
					.where('path', options.path)
					.update('strength', strength)
					.asCallback(callback)
		});
	}

	/**
	 * @param  {int}  options.path
	 */
	this.getPathAverate = function(options, callback){
		k(TABLE)
			.avg('strength')
			.where('type', CONSTANTS.types.path)
			.andWhere('item', options.path)
			.asCallback(function(err, results){
				if( !results || !results.length ){
					return callback(null, 0.0);
				}
				var values = _.values(results[0]);
				return callback(null, values[0]);
			});
	}
}