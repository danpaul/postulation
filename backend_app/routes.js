var config = require('../config');
var secret = require('../secret');

// init schema and knex
var knex = require('knex')(config.knex);
require('./lib/schema')({knex: knex}, function(err){
	if( err ){ throw(err); }
});

var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var transporter = nodemailer.createTransport(smtpTransport(secret.smtp));

var Models = require('./models');
var models = new Models({knex: knex});

var Controllers = require('./controllers');
var controllers = new Controllers({models: models});

var auth = require('./lib/auth');

module.exports = function(app){


    var sqlLoginMiddleware = require('sql_user_manager')(app, {
        rootUrl: config.rootUrl + '/auth',
        knex: knex,
        useUsername: true,

        transporter: transporter,
        siteName: 'Postulation',
        sessionSecret: 'super duper secret',
        loginSuccessRedirect: config.rootUrl
    });

	app.use('/auth', sqlLoginMiddleware);

	var Routes = require('./routes/index.js');
	var routes = new Routes(app, {controllers: controllers,
								  sqlLogin: sqlLoginMiddleware.sqlLogin,
								  auth: auth});
}