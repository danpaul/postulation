var _ = require('underscore');
var async = require('async');

module.exports = function(options){
	var m = options.models;
	var r = options.response;

	/**
	 * @param  {int}  options.user
	 * @param  {array}  options.nodes - mixed elements
	 * @param  {bool}  options.charge - if path negates a node or link, should be false
	 *                                	negated element should be last element of path
	 */
	this.create = function(options, callback){
		if( !options || !options.user ){
			return r({errorCode: 'missingOptions'}, callback);
		}
		var charge = null;
		if( options.hasOwnProperty('charge') ){ charge = options.charge; }
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
						  function(err, nodes){
				// link nodes
				m.link.create({nodes: nodes, path: pathId, charge: charge},
							  function(err){
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
		this.getLinkData(options, callback)

	}

	this.getLinkData = function(options, callback){
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
						if( err ){ return cb(err); }
						nodesIn.forEach(function(n){
							nodeMap[n.id] = n;
						});
						cb();
					});
				}, function(cb){
					// get links
					if( !linkIds.length ){ return cb(); }
					m.link.getLinks({links: linkIds}, function(err, linksIn){
						if( err ){ return cb(err); }
						linksIn.forEach(function(l){
							linkMap[l.id] = l;
						});
						cb();
					});
				}
			], function(err){
				if( err ){
					console.log(err);
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
						l.type = 'link';
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