// DEPRECATED, USING MIDDLEWARE FOR USER MANAGEMENT

var _ = require('underscore');
const TABLE = 'user';

module.exports = function(options){

	// asdf
	// this should get handled by login middleware now...


	// var k = options.knex;

	// this.create = function(options, callback){
	// 	k(TABLE).insert({}).asCallback(function(err, user){
	// 		if( err ){ return callback(err); }
	// 		if( !user || !user.length ){
	// 			return callback(new Error('Unale to create user'));
	// 		}
	// 		return callback(null, user[0])
	// 	});
	// }

	// /**
	//  * Gets user by ID
	//  * @param  {int}  optins.userId
	//  */
	// this.get = function(options, callback){
	// 	k(TABLE)
	// 		.where('id', options.userId)
	// 		.asCallback(function(err, users){
	// 			if( err ){ return callback(err); }
	// 			return callback(null, users[0]);
	// 		});
	// }
}