var _ = require('underscore');
var GENERIC_ERROR ='Sorry, an unknown error occurred';
module.exports = function(options){

    var controllers = options.controllers;
    var data = options.data;
    var superagent = options.superagent;
    var siteUrl = options.siteUrl;

    this.updateMessage = function(event){
    	data.set(['contactForm', 'message'], event.target.value);
    }
    this.submit = function(){
    	data.set(['contactForm', 'sending'], true);
    	var query = { rest_route: '/wp-api-contact/v1/send' };
		superagent
	  		.post(siteUrl + '/')
	  		.query(query)
	  		.send({ message: data.get(['contactForm', 'message']) })
	  		.end(function (err, response){
	  			data.set(['contactForm', 'sending'], false);
	  			if( err ){
	  				console.log(err);
	  				return data.set(['contactForm', 'error'], GENERIC_ERROR);
	  			}
	  			if( response.body.error ){
	  				return data.set(['contactForm', 'error'],
	  								response.body.error);
	  			}
	  			data.set(['contactForm', 'error'], '');
	  			data.set(['contactForm', 'message'], '');
	  			data.set(['contactForm', 'sent'], true);
	  		}
		);
    }
}