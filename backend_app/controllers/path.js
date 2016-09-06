var _ = require('underscore');

module.exports = function(options){
	var m = options.models;
	var r = options.response;

	/**
	 * @param  {int}  options.user
	 * @param  {array}  options.nodes
	 *
	 * 
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
				})

			})
		})
	}
}