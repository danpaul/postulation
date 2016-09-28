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
        var self = this;

		superagent
	  		.post(siteUrl + '/api/vote')
	  		.send(options)
	  		.end(function (err, response){
	  			if( err ){
	  				// todo handle error
	  				console.log(err);
	  			}
                if( response.body.status === 'success'){
                    options.refresh = true;
                    self.get(options);
                    console.log('success');
                } else {
                    console.log('error');
                }
	  		});
    }

    /**
     * Gets user vote history
     * @param  {string}  options.type  path, node or link
     * @param  {int}  options.id
     * @param  {bool}  options.refresh  optional, defaults to false
     */
    this.get = function(options){
    	var userId = d.get(['user', 'id']);
        const refresh = options.refresh ? true : false;

// ASDF
userId = 666;

    	if( !userId ){ return; }
    	var url = siteUrl + '/api/vote/user/' + userId + '/' +
    						options.type + '/' + options.id;
		superagent
	  		.get(url)
            .forceUpdate(refresh)
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
                    } else if( options.type === 'node' ){
                        const path = d.get(['path', 'path']);
                        for( var i = 0; i < path.size; i++ ){
                            const item = path.get(i);
                            if( item.get('type') === 'node' &&
                                item.get('id') === options.id ){
                                d.set(['path', 'path', i, 'userVote'],
                                      vote.true);
                            }
                        }
                    }
                } else {
                    // TODO: handle error
                    console.log('error');
                }
	  		});
    }
}