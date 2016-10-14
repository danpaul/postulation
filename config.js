var config = {};
var secret = require('./secret');

config.environment = process.env.NODE_ENV ?
                     process.env.NODE_ENV : 'development';

if( config.environment === 'development' ){

    config.useBasicAuth = false;

    config.sessionSecret = 'super secret';
    config.cookieSecrety = 'super secret';
    config.port = 3000;

	config.knex = {
	    client: 'mysql',
	    connection: {
	        host: 'localhost',
	        user: 'root',
	        password: 'root',
	        database: 'postulation',
	        port:  8889
	    }
	};

	config.rootUrl = 'http://localhost:3000';

} else if( config.environment === 'production' ) {

    config.useBasicAuth = true;
    config.knex = secret.knex;
    config.port = 80;

} else {
    throw('App must be started with env flag set.')
}

module.exports = config;