import page from 'page';

const Immutable = require('immutable');
const ERROR_EMAIL = 'Email is not valid';
const ERROR_USERNAME = 'Username must be at least two characters and only contain characters, letters, underscores, dots and dashes';
const ERROR_PASSWORD = 'Password must be at leat eight characters';
const ERROR_PASSWORD_CONFIRM = 'Passwords do not match';

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

    /***************************************************************************
     *
     * 		Registration
     * 
     **************************************************************************/

    /**
     * Shows the new user registration view
     */
    this.showRegister = function(){
    	d.set('view', 'register');
    }
    /**
     * Validates username and optionally sets error data
     */
    this.validateRegisterUsername = function(setData = true){
    	const u = d.get(['user', 'registerFormData', 'username']);
    	var v = '';
    	if( !this.usernameIsValid(u) ){ v = ERROR_USERNAME; }
    	if( setData ){
    		d.set(['user', 'registerFormData', 'usernameError'], v);
    	}
    	return( v === '' );
    }
    /**
     * Validates email and optionally sets error data
     */
    this.validateRegisterEmail = function(setData = true){
    	const email = d.get(['user', 'registerFormData', 'email']);
    	var v = '';
    	if( !this.emailIsValid(email) ){ v = ERROR_EMAIL; }
    	if( setData ){
    		d.set(['user', 'registerFormData', 'emailError'], v);
    	}
    	return( v === '' );
    }
    /**
     * Validates password and optionally sets error data
     */
    this.validateRegisterPassword = function(setData = true){
    	const p = d.get(['user', 'registerFormData', 'password']);
    	var v = '';
    	if( !this.passwordIsValid(p) ){ v = ERROR_PASSWORD; }
    	if( setData ){
    		d.set(['user', 'registerFormData', 'passwordError'], v);
    	}
    	return( v === '' );
    }
    /**
     * Validates password and optionally sets error data
     */
    this.validateRegisterConfirmPassword = function(setData = true){
    	const p1 = d.get(['user', 'registerFormData', 'password']);
    	const p2 = d.get(['user', 'registerFormData', 'confirmPassword']);
    	var v = '';
    	if( p1 !== p2 ){ v = ERROR_PASSWORD_CONFIRM; }
    	if( setData ){
    		d.set(['user', 'registerFormData', 'confirmPasswordError'], v);
    	}
    	return( v === '' );
    }
    this.validateRegisterForm = function(setData = false){
    	var valid = true;
 	    [this.validateRegisterUsername.bind(this),
    	 this.validateRegisterEmail.bind(this),
		 this.validateRegisterPassword.bind(this),
		 this.validateRegisterConfirmPassword.bind(this)].forEach(function(f){
		 	if( !f(setData) ){ valid = false; }
		});
		d.set(['user', 'registerFormData', 'formIsValid'], valid);
		return valid;
    }
    /**
     * Updates register form data
     * @param  {string}  options.field
     * @param  {string}  options.value
     */
    this.updateRegisterFieldValue = function(options){
    	d.set(['user', 'registerFormData', options.field], options.value);
    }
    /**
     * Handles submitting registration data
     */
    this.submitRegisterForm = function(){
    	if( !this.validateRegisterForm(true) ){ return; }
    	var data = {};
    	['username', 'email', 'password'].forEach(function(k){
    		data[k] = d.get(['user', 'registerFormData', k]);
    	});

		superagent
	  		.post(siteUrl + '/api/auth/register')
	  		.send(data)
	  		.end(function (err, response){
	  			if( err ){
	  				console.log(err);
	  			}
                if( response.body.status === 'success'){
                	d.set(['user', 'id'], response.body.data.user.id);
                	page('/');
                	// d.set('view', 'home');
                    console.log('success');
                } else {
                    console.log('error');
                }
                console.log(response.body)
	  		}
		);

    }

    /***************************************************************************
     *
     * 		Validation functions
     * 
     **************************************************************************/
    this.emailIsValid = function(email){
        var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        return re.test(email);
    }

    this.passwordIsValid = function(password){
        return( !(!password || password.length < 8) );
    }

    this.usernameIsValid = function(username){
        if( !username || username.length < 2 ){ return false; }
        return(/^([a-zA-Z0-9]|\-|\_|\.)+$/.test(username));
    }

}