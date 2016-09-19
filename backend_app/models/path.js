var _ = require('underscore');
const TABLE = 'path';

module.exports = function(options){
	var k = options.knex;

	this.create = function(options, callback){
		k(TABLE).insert({user: options.user, title: options.title})
				.asCallback(callback);
	}

	this.get = function(options, callback){
		k(TABLE).where('id', options.id).asCallback(callback);
	}
}