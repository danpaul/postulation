const Immutable = require('immutable');

module.exports = function(options){

	var self = this;

    var c = options.controllers;
    var d = options.data;
    var superagent = options.superagent;

    /**
     * Updates new path's title, receives event from title input
     * @param  {e} input change event
     */
    this.onTitleChange = function(e){
    	d.set(['createPath', 'title'], e.target.value);
    }
    /**
     * Updates a newly created node's statement
     * @param  {int}  options.index
     * @param  {string}  options.statement
     */
    this.updateNodeStatement = function(options){
    	d.set(['createPath', 'nodes', options.index, 'statement'],
    		  options.statement);
    }
    this.addNode = function(e){
    	d.push(['createPath', 'nodes'], this._getBaseNode());
    }
    this._getBaseNode = function(){
    	return Immutable.fromJS({statement: ''});
    }
}