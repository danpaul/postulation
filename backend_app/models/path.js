var _ = require('underscore');
const TABLE = 'path';

module.exports = function(options){
	var k = options.knex;

	this.create = function(options, callback){
		k(TABLE).insert({}).asCallback(function(err, path){
			if( err ){ return callback(err); }
			if( !path || !path.length ){
				return callback(new Error('Unale to create user'));
			}
			return callback(null, path[0]);
		});
	}
}