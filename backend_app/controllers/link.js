var _ = require('underscore');
var async = require('async');
const PARRALEL_LIMIT = 10;

module.exports = function(options){
	var m = options.models;
	var r = options.response;
	var c = options.controllers;


	/**
	 * gets responses to nodes or links
	 * @param  {object}  options.node
	 * @param  {bool}  options.charge  optional, defaults to false
	 */
	this.getResponses = function(options, callback){
		if( !options || !(options.node || options.link) ){
			return r({errorCode: 'missingOptions'}, callback);
		}
		m.link.getResponses(options, function(err, links){
			if( err ){
				console.log(err);
				return r({errorCode: 'unknown'}, callback);
			}
			var paths = _.map(links, function(l){
				return {
					id: l.path,
					strength: l.strength
				}
			});
			return r({data: {paths: paths}}, callback);
		});
	}

    /**
     * Gets responses to a path by node or link
     * @param {int} options.id
     * @param {string} options.type
     * @param {boolean} options.charge
     * @param {boolean}  option.joinData
     */
	this.getResponsesById = function(options, callback){
		var self = this;
		if( !options || !options.id || !options.type ||
			!(options.charge === true || options.charge === false) ){
			return r({errorCode: 'missingOptions'}, callback);
		}
		var joinData = options.joinData ? true : false;
		var method = (options.type === 'link') ? m.link.getLink : m.node.getNode;
		method({id: options.id}, function(err, response){
			if( err ){
				console.log(err);
				return r({errorCode: 'unknown'}, callback);
			}
			if( !response || !response.length ){
				return r({errorCode: 'invalidResponseItem'}, callback);
			}
			var item = response[0];
			var args = {charge: options.charge};
			if( options.type === 'link' ){
				args.link = item;
			} else {
				args.node = item;
			}
			if( !joinData ){ return self.getResponses(args, callback); }
			self.getResponses(args, function(err, response){
				if( err ){
					console.log(err);
					return r({errorCode: 'unknown'}, callback);
				}
	            if( response.status !== 'success' ||
	                !response.data.paths.length ){
	            	return callback(null, response);
	            }
	            self._joinPathData({paths: response.data.paths}, callback);
			});
		});
	}

	/**
	 * @param  {paths}
	 */
	this._joinPathData = function(options, callback){
		var paths = [];
		async.eachLimit(options.paths, PARRALEL_LIMIT, function(path, callback){

			c.path.get({id: path.id}, function(err, resp){
				if( err ){ return callback(err); }
				if( resp.status !== 'success' ){
					return callback(new Error(resp.error));
				}
				paths.push(resp.data.path);
				callback();
			});
		}, function(err){
			if( err ){
				console.log(err);
				return r({errorCode: 'unknown'}, callback);
			}
			paths = (_.sortBy(paths, 'strength')).reverse();
			return r({data: {paths: paths}}, callback);
		});
	}
}