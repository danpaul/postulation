var _ = require('underscore');
var async = require('async');
const constants = require('../constants');
const publicUserProps = ['id', 'username'];

module.exports = function(options){
	var m = options.models;
	var r = options.response;
	var sqlLogin = options.sqlLogin;

	/**
	 * Passes back boolean to callback true if final node is valid
	 */
	this._validateFinalNode = function(nodes, callback){
		const node = nodes[nodes.length - 1];
		if(_.isString(node) ){ return callback(null, true); }
		if( node.type === 'link' ){
			var method = m.link.getLink.bind(this);
		} else if( node.type === 'node' ){
			var method = m.node.getNode.bind(this);
		} else {
			return callback(null, false);
		}
		method({id: node.id}, function(err, items){
			if( err ){ return callback(err); }
			if( !items || !items.length ){
				return callback(null, false);
			} else {
				return callback(null, true);
			}
		});
	}

	/**
	 * @param  {int}  options.user
	 * @param  {array}  options.nodes - mixed elements
	 * @param  {bool}  options.charge - if path negates a node or link, should be false
	 *                                	negated element should be last element of path
	 */
	this.create = function(options, callback){
		var self = this;
		if( !options || !options.user ){
			return r({errorCode: 'missingOptions'}, callback);
		}
		if( _.isArray(options.nodes) ){
			this._validateFinalNode(options.nodes, function(err, isValid){
				if( err ){
					console.log(err);
					return r({errorCode: 'unknown'}, callback);
				}
				if( !isValid ){
					return r({errorCode: 'invalidNode'}, callback);
				}
				self._create(options, callback);
			});
		} else {
			this._create(options, callback);
		}
	}

	this._create = function(options, callback){
		var charge = null;
		if( options.hasOwnProperty('charge') ){ charge = options.charge; }
		m.path.create({user: options.user, title: options.title},
					  function(err, pathData){
			if( err ){
				console.log(err);
				return r({errorCode: 'unknown'}, callback);
			}
			var pathId = pathData[0];
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
		var self = this;
		// get path
		m.path.get({id: options.id}, function(err, pathData){
			if( err ){
				console.log(err);
				return r({errorCode: 'unknown'}, callback);
			}
			if( !pathData || !pathData.length ){
				return r({errorCode: 'invalidPath'}, callback);
			}
			var data = {path: pathData[0]};
			self.getLinkData(options, function(err, response){
				if( err ){
					console.log(err);
					return r({errorCode: 'unknown'}, callback);
				}
				if( response.status !== 'success' ){
					return callback(null, response);
				}
				data.path.path = response.data.path.path;
				return r({data, data}, callback);
			});
		});		
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

	/**
	 * Gets most recent posts
	 * @param  {options.page}
	 */
	this.getRecent = function(options, callback){
		options.trending = false;
		this._getPaths(options, callback);
	}

	/**
	 * Gets trending posts
	 * @param  {options.page}
	 */
	this.getTrending = function(options, callback){
		options.trending = true;
		this._getPaths(options, callback);
	}

	this._getPaths = function(options, callback){
		
		var self = this;
		if( options.trending ){
			var method = m.path.getTrending.bind(this);
		} else {
			var method = m.path.getRecent.bind(this);
		}

		method({limit: constants.pageLimit, page: options.page},
			   function(err, paths){

			if( err ){
				console.log(err);
				return r({errorCode: 'unknown'}, callback);
			}

			var data = {paths: []};			
			if( !paths.length ){ return r({data: data}, callback); }

			var pathMap = {};
			async.eachLimit(paths, constants.parallelLimit, function(path, callback){
				self.get({id: path.id}, function(err, response){
					if( err ){ return callback(err); }
					if( response.status !== 'success' ){
						return callback(new Error(response.error));
					}
					pathMap[path.id] = response.data.path;
					callback();
				});
			}, function(err){
				if( err ){
					console.log(err);
					return r({errorCode: 'unknown'}, callback);
				}
				paths.forEach(function(path){
					data.paths.push(pathMap[path.id]);
				});
				self._joinUsers({data: data}, true, callback);
			});
		});

	}

	/**
	 * Joins users to path data
	 * @param  {object}  options.data  path data
	 */
	this._joinUsers = function(options, public, callback){
		var paths = options.data.paths;
		async.eachLimit(paths, constants.parallelLimit, function(path, callback){
			sqlLogin.getUser(path.user, function(err, user){
				if(err){ return callback(err); }
				var cleanUser = {};
				// TODO: add public check here if ever not public properties are returned
				publicUserProps.forEach(function(properties){
					cleanUser[properties] = user[properties];
				})
				path.user = cleanUser;
				callback();
			});
		}, function(err){
			if( err ){
				console.log(err);
				return r({errorCode: 'unknown'}, callback);
			}
			return r({data: options.data}, callback);
		});
	}
}