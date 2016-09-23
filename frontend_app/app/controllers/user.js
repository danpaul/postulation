const Immutable = require('immutable');

const ERRROR_USERNAME = 'Username must be at least two characters and only contain characters, letters, underscores, dots and dashes';

module.exports = function(options){

	var self = this;

    var c = options.controllers;
    var d = options.data;
    var superagent = options.superagent;
    var siteUrl = options.siteUrl;

    this.init = function(){
        var self = this;
		superagent
	  		.get(siteUrl + '/api/auth')
	  		.end(function (err, response){
	  			if( err ){
	  				// TODO: add error handling
	  				console.log(err);
	  				return;
	  			}

	  			// set user id to null
	  			if( response.body.status === 'failure' ){
	  				return d.set(['user', 'id'], null);
	  			}

	  			// setup user...
	  		}
		);
    }

    this.showRegister = function(){
    	d.set('view', 'register');
    }

    /**
     * Updates register form error
     */
    this.validateRegisterUsername = function(){
    	const u = d.get(['user', 'registerFormData', 'username']);
    	const k = ['user', 'registerFormData', 'usernameError'];
    	if( !this.usernameIsValid(u) ){ d.set(k, ERRROR_USERNAME);
    	} else { d.set(k, ''); }
    }

    /**
     * Updates register form data
     * @param  {string}  options.field
     * @param  {string}  options.value
     */
    this.updateRegisterFieldValue = function(options){
    	d.set(['user', 'registerFormData', options.field], options.value);
    }

    this.emailIsValid = function(email){
        var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        return re.test(email);
    }

    this.passwordIsValid = function(password){
        if( !password ){ return false; }
        if( password.length < self.passwordMinLength ){ return false; }
        return true;
    }

    this.usernameIsValid = function(username){
        if( !username || username.length < 2 ){ return false; }
        return(/^([a-zA-Z0-9]|\-|\_|\.)+$/.test(username));
    }

}