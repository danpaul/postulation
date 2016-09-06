var _ = require('underscore');
var async = require('async');

module.exports = function(options){
	var m = options.models;
	var r = options.response;

	/**
	 * @param  {int}  options.user
	 * @param  {array}  options.nodes - mixed elements
	 */
	this.create = function(options, callback){
		if( !options || !options.user ){
			return r({errorCode: 'missingOptions'}, callback);
		}
		m.path.create({user: options.user}, function(err, pathId){
			if( err ){
				console.log(err);
				return r({errorCode: 'unknown'}, callback);
			}
			var data = {path: {id: pathId}};
			if( !options.nodes ){
				return r({data: data}, callback);
			}
			m.node.create({nodes: options.nodes, user: options.user},
						  function(err, nodeIds){
				// link nodes
				m.link.create({nodes: nodeIds, path: pathId}, function(err){
					if( err ){
						console.log(err);
						return r({errorCode: 'unknown'}, callback);
					}
					return r({data: data}, callback);
				});

			});
		});
	}

	/**
	 * @param  {int}  options.id
	 */
	this.get = function(options, callback){
		// get paths links
		m.link.get({path: options.id}, function(err, links){
			if( err ){
				console.log(err);
				return r({errorCode: 'unknown'}, callback);
			}
			if( !links || !links.length ){
				return r({errorCode: 'invalidPath'}, callback);
			}

			var nodeIds = [];
			var linkIds = [];
			var linkMap = {}
			var nodeMap = {};

			for( var i = 0; i < links.length; i++ ){
				var link = links[i];
				if( i == 0 ){
					nodeIds.push(link.from)
				}
				if( link.to_final && link.final_is_link ){
					linkIds.push(link.to);
				} else {
					nodeIds.push(link.to);
				}
			}

			async.parallel([
				function(cb){
					// get nodes
					m.node.getNodes({nodes: nodeIds}, function(err, nodesIn){
						if( err ){
							console.log(err);
							return cb(err)
						}
						nodesIn.forEach(function(n){
							nodeMap[n.id] = n;
						});
						cb();
					});
				}, function(cb){
					// get links
					if( !linkIds ){ return cb(); }
					// TODO: retrieve links
					// TODO: add to link map
					cb();
				}
			], function(err){
				if( err ){
					return r({errorCode: 'unknown'}, callback);
				}

				var path = [];

				for( var i = 0; i < links.length; i++ ){
					var link = links[i];
					if( i == 0 ){
						var n = _.clone(nodeMap[link['from']]);
						n.type = 'node';
						path.push(n);
					}
					var l = _.clone(link);
					l.type = 'link';
					path.push(l);
					if( link.to_final && link.final_is_link ){
						var l = _.clone(linkMap[link['to']]);
						n.type = 'link';
						path.push(l);
					} else {
						var n = _.clone(nodeMap[link['to']]);
						n.type = 'node';
						path.push(n);
					}
				}
				var data = {path: {id: options.id, path: path}};
				return r({data: data}, callback);
			});
		});
	}
}