const Immutable = require('immutable');

module.exports = function(options){

    var self = this;

    var c = options.controllers;
    var d = options.data;
    var superagent = options.superagent;
    var siteUrl = options.siteUrl;

    this.toggle = function(){
        d.set(['drawer', 'open'], !d.get(['drawer', 'open']));
    }
}