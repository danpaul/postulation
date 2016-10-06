var response = require('./response');

module.exports = {

	loginCheck: function(req, res){
		if( !req || !req.session || !req.session.user || !req.session.user.id ){
			res.json(response({errorCode: 'notLoggedIn'}));
			return null;
		}
		return req.session.user;
	}

};