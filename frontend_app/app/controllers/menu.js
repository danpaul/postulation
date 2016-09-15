var _ = require('underscore');
module.exports = function(options){

    var controllers = options.controllers;
    var data = options.data;
    var superagent = options.superagent;
    var siteUrl = options.siteUrl;

    this.loadMain = function(callbackIn){
    	var self = this;
		superagent
	  		.get(siteUrl)
	  		.query({ rest_route: '/wp-api-menus/v2/menus' })
	  		.end(function (err, response){
	  			if( err ){ return console.log(err); }
	  			if( !response.body || !_.isArray(response.body) ){
	  				return console.log(new Error('No menu'));
	  			}
	  			self._loadMainMenuDetails({id: response.body[0]['ID']});
	  		}
		);
    }
    this._loadMainMenuDetails = function(options){
    	var query = '/wp-api-menus/v2/menus/' + options.id;
		superagent
	  		.get(siteUrl)
	  		.query({ rest_route: query })
	  		.end(function (err, response){
	  			if( err ){ return console.log(err); }
	  			if( !response.body ){
	  				return console.log(new Error('No menu'));
	  			}
	  			data.set('mainMenu', response.body);
	  		}
		);
    }
}