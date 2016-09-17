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
	var Routes = require('./routes/index.js');
	var routes = new Routes(app, {controllers: controllers});
}