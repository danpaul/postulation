var _ = require('underscore');

module.exports = function(options){
	var m = options.models;
	var r = options.response;

	this.create = function(options, callback){
		m.user.create({}, function(err, user){
			if( err ){
				console.log(err);
				return callback(null, r({errorCode: 'unknown'}));
			}
			return callback(null, r({data: {user: {id: user}}}));
		});
	}
}