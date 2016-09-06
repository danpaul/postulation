var _ = require('underscore');
const TABLE = 'user';

module.exports = function(options){
	var k = options.knex;

	this.create = function(options, callback){
		k(TABLE).insert({}).asCallback(function(err, user){
			if( err ){ return callback(err); }
			if( !user || !user.length ){
				return callback(new Error('Unale to create user'));
			}
			return callback(null, user[0])
		});
	}
}