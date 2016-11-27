import page from 'page';

const Immutable = require('immutable');

module.exports = function(options){

	var self = this;

    var c = options.controllers;
    var d = options.data;
    var superagent = options.superagent;
    var siteUrl = options.siteUrl;

    /**
     * Initializes user data (called on page load)
     */
    this.init = function(){
        var self = this;
		superagent
	  		.get(siteUrl + '/auth/api')
	  		.end(function (err, response){
	  			if( err ){
                    console.log(err);
                    c.snackbar.add(c.error.unknown);
                    return;
	  			}
	  			// set user id to null
	  			if( response.body.status === 'failure' ){
	  				return d.set(['user', 'id'], null);
	  			}
	  			// setup user...
                d.set('user', response.body.data);
	  		}
		);
    }

    /***************************************************************************
     *
     *      View management
     * 
     **************************************************************************/
    this.showLogin = function(){
        window.location.href = siteUrl + '/auth/login';
    }

    this.logout = function(){
        window.location.href = siteUrl + '/auth/logout';
    }
}