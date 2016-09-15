var _ = require('underscore');
module.exports = function(options){

    var controllers = options.controllers;
    var data = options.data;
    var superagent = options.superagent;
    var siteUrl = options.siteUrl;

    // loads multiple posts
    this.load = function(options){
    	data.startTransition();
    	var query = { rest_route: '/wp/v2/posts' };
    	var page = 1;
    	if( options.page ){ page = options.page; }
    	query.page = page;
    	data.set('currentPage', page);
    	query.per_page = data.perPage;
    	if( options.cat ){ query.categories = [options.cat]; }
    	if( options.tag ){
    		query.tags = [options.tag];
    	}
		superagent
	  		.get(siteUrl)
	  		.query(query)
	  		.end(function (err, response){
	  			if( err ){ return console.log(err); }
	  			if( response.body && _.isArray(response.body) ){
	  				data.set('posts', response.body);
	  			}
	  			data.endTransition();
	  		}
		);
    }

    // loads individual post
    this.loadPost = function(options){
    	data.startTransition();
		var route = '/wp/v2/posts/' + options.p;
		superagent
	  		.get(siteUrl)
	  		.query({rest_route: route })
	  		.end(function (err, response){
	  			if( err ){ return console.log(err); }
	  			if( response.body && _.isObject(response.body) ){
	  				data.set('post', response.body);
	  			}
    			data.endTransition();
	  		});
    }
}