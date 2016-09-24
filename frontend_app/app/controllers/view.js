const Immutable = require('immutable');

module.exports = function(options){

	var self = this;

    var c = options.controllers;
    var d = options.data;
    var superagent = options.superagent;
    var siteUrl = options.siteUrl;

    this.showHome = function(){
    	d.set('view', 'home');
    }

}