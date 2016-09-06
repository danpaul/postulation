var _ = require('underscore');
const TABLE = 'link';

module.exports = function(options){
	var k = options.knex;

	/**
	 * @param  {options.nodes}
	 * @param  {options.path}
	 */
	this.create = function(options, callback){
		var paths = this.linkPaths(options);
		if( !paths ){ return callback(new Error('Missing options')); }
		k(TABLE).insert(paths).asCallback(callback);
	}

	/**
	 * @param  {array}  options.nodes
	 * @param  {int}  options.path
	 */
	this.linkPaths = function(options){
		if( !options || !options.nodes || !options.path ){
			console.log(new Error('Missing options'));
			return null;
		}
		var links = [];
		for( var i = 0; i < options.nodes.length - 1; i++ ){
			var link = {path: options.path};
			link.from = options.nodes[i];
			if( i < (options.nodes.length - 1) ){
				link.to = options.nodes[i + 1];
			}
			if( i === (options.nodes.length - 2) ){
				link.to_final = true;
			}
			links.push(link);
		}
		return links;
	}

	/**
	 * @param  {int}  options.path
	 */
	this.get = function(options, callback){
		k(TABLE)
			.where('path', options.path)
			.orderBy('id', 'asc')
			.asCallback(function(err, links){
				if( err ){ return callback(err); }
				return callback(null, links);
			});
	}

}