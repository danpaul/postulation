var _ = require('underscore');
var async = require('async');

const TABLE = 'node';

module.exports = function(options){
	var k = options.knex;

	this.create = function(options, callback){
		var nodes = options.nodes;
		if( !_.isArray(nodes) ){ nodes = [nodes]; }
		var nodes = _.map(nodes, function(n){
			return {
				user: options.user,
				statement: n
			};
		});

		var nodeIds = [];

		async.eachSeries(nodes, function(node, callback){
			k(TABLE).insert(node).asCallback(function(err, nodeId){
				if( err ){ return callback(err); }
				if( !nodeId || !nodeId.length ){
					return callback(new Error('Unale to create node'));
				}
				nodeIds.push(nodeId[0]);
				callback();
			});
		}, function(err){
			if( err ){ return callback(err); }
			return callback(null, nodeIds);
		})
	}
}