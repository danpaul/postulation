var _ = require('underscore');
module.exports = function(options){
    var controllers = options.controllers;
    var data = options.data;
    var superagent = options.superagent;
    var siteUrl = options.siteUrl;
    this.load = function(options){
    	data.startTransition();
    	var route = '/wp/v2/pages/' + options.page;
		superagent
	  		.get(siteUrl)
	  		.query({rest_route: route})
	  		.end(function (err, response){
	  			if( err ){ return console.log(err); }
	  			if( response.body && _.isObject(response.body) ){
	  				data.set('page', response.body);
	  			}
	  			data.endTransition();
	  		}
		);
    }
}