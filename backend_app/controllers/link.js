var _ = require('underscore');
var async = require('async');

module.exports = function(options){
	var m = options.models;
	var r = options.response;


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
     */
	this.getResponsesById = function(options, callback){

	}
}