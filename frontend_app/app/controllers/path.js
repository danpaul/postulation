module.exports = function(options){

    var c = options.controllers;
    var d = options.data;
    var superagent = options.superagent;

    this.showCreate = function(){
    	d.set('view', 'createPath');
    }

    this.get = function(options){

    }
}