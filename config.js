var config = {};
var secret = require('./secret');

config.environment = process.env.NODE_ENV ?
                     process.env.NODE_ENV : 'development';

// config.rankUpdateInterval = 1000 * 60 * 10; //update post's rankings every 10 minutes
// asdf
config.rankUpdateInterval = 1000 * 60; //update post's rankings every 10 minutes
config.parallelLimit = 10;
config.trendLimit = 1000 * 60 * 60 * 24 * 7;// time after which trending rankings will expire (equal zero)

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

    config.rootUrl = 'http://198.199.65.198';
    config.useBasicAuth = true;
    config.knex = secret.knex;
    config.port = 80;

} else {
    throw('App must be started with env flag set.')
}

module.exports = config;