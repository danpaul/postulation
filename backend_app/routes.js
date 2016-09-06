var config = require('../config');

// init schema and knex
var knex = require('knex')(config.knex);
require('./lib/schema')({knex: knex}, function(err){
	if( err ){ throw(err); }
});

var Models = require('./models');
var models = new Models({knex: knex});

var Controllers = require('./controllers');
var controllers = new Controllers({models: models});

module.exports = function(app){

    app.get('/', function(req, res){ res.sendFile('../public/index.html'); });

    app.get('/api/test', function(req, res){
    	res.json({});
    });

}