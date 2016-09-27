const Immutable = require('immutable');

module.exports = function(options){

	var self = this;

    var c = options.controllers;
    var d = options.data;
    var superagent = options.superagent;
    var siteUrl = options.siteUrl;

    /**
     * Handles submitting votting
     * @param  {string}  options.type  path, node or link
     * @param  {int}  options.id
     * @param  {bool}  options.true
     */
    this.add = function(options){
		superagent
	  		.post(siteUrl + '/api/vote')
	  		.send(options)
	  		.end(function (err, response){
	  			if( err ){
	  				// todo handle error
	  				console.log(err);
	  			}
                if( response.body.status === 'success'){
                    console.log('success');
                } else {
                    console.log('error');
                }
                console.log(response.body)
	  		});
    }

    /**
     * Gets user vote history
     * @param  {string}  options.type  path, node or link
     * @param  {int}  options.id
     */
    this.get = function(options){
    	var userId = d.get(['user', 'id']);

// ASDF
userId = 666;

    	if( !userId ){ return; }
    	var url = siteUrl + '/api/vote/user/' + userId + '/' +
    						options.type + '/' + options.id;
		superagent
	  		.get(url)
	  		.end(function (err, response){
	  			if( err ){
	  				// todo handle error
	  				console.log(err);
	  			}
                if( response.body.status === 'success'){
                	const vote = response.body.data.vote;
                	if( !vote ){ return; }
                    if( options.type === 'path' ){
                    	var pathId = d.get(['path', 'id']);
                    	if( pathId !==  vote.item ){ return; }
                    	d.set(['path', 'userVote'], vote.true);
                    }
                } else {
                    console.log('error');
                }
	  		});
    }
}