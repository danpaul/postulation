var _ = require('underscore');
module.exports = function(options){

    var controllers = options.controllers;
    var data = options.data;
    var superagent = options.superagent;

    this.setParamsFromUrl = function(){
    	data.set('urlState', this.parseParams());
    }

    this.parseParams = function(){
	    var match;
	    var pl     = /\+/g;
	    var search = /([^&=]+)=?([^&]*)/g;
	    var decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); };
	    var query  = window.location.search.substring(1);
	    var urlState = {};
	    while(match = search.exec(query)){
	       urlState[decode(match[1])] = decode(match[2]);
	    }
	    if( urlState.page ){
	    	urlState.page = Number(urlState.page);
	    }
	    return urlState;
    }
}