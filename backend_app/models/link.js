var _ = require('underscore');
const TABLE = 'link';
const CONTANTS = require('../constants');

module.exports = function(options){
	var k = options.knex;

	/**
	 * @param  {options.nodes}
	 * @param  {options.path}
	 */
	this.create = function(options, callback){
		var links = this.linkPaths(options);
		if( !links ){ return callback(new Error('Missing options')); }
		k(TABLE).insert(links).asCallback(callback);
	}

	/**
	 * @param  {array}  options.nodes
	 * @param  {int}  options.path
	 * @param  {int}  options.charge - optional, if false will set 
	 */
	this.linkPaths = function(options){
		if( !options || !options.nodes || !options.path ){
			console.log(new Error('Missing options'));
			return null;
		}
		var links = [];
		for( var i = 0; i < options.nodes.length - 1; i++ ){
			var link = {path: options.path};

			if( _.isObject(options.nodes[i]) ){
				link.from = options.nodes[i]['id'];
			} else {
				link.from = options.nodes[i];
			}

			if( i < (options.nodes.length - 1) ){
				if( _.isObject(options.nodes[i + 1]) ){
					link.to = options.nodes[i + 1]['id'];
				} else {
					link.to = options.nodes[i + 1];
				}
			}
			if( i === (options.nodes.length - 2) ){
				link.to_final = true;
				if( _.isObject(options.nodes[i + 1]) &&
					options.nodes[i + 1]['type'] === 'link' ){

					link.final_is_link = true;
				}
				if( _.isObject(options.nodes[i + 1]) &&
					options.charge === false ){

					link.charge = false;
				}
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

	/**
	 * Gets link by id
	 * @param  {int}  options.id
	 */
	this.getLink = function(options, callback){
		k(TABLE)
			.where('id', options.id)
		  	.asCallback(callback);
	}

	/**
	 * @param  {array}  options.links  array of link ids
	 */
	this.getLinks = function(options, callback){
		k.select('*').from('link')
			.whereIn('id', options.links)
		  	.asCallback(callback);
	}

	/**
	 * @param  {object}  options.node  - one of
	 * @param  {object}  options.link  - one of
	 * @param  {bool}  options.charge  - defaults to false
	 */
	this.getResponses = function(options, callback){
		var charge = options.charge ? true : false;
		if( options.link ){
			var id = options.link.id;
			var finalIsLink = true;
		} else {
			var id = options.node.id;
			var finalIsLink = false;
		}
		k.select('*').from(TABLE)
			.where('to', id)
			.andWhere('to_final', true)
			.andWhere('charge', charge)
			.andWhere('final_is_link', finalIsLink)
			.orderBy('strength', 'desc')
			.asCallback(callback);
	}
}