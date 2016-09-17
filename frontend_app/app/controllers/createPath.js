const Immutable = require('immutable');

const ERROR_TITLE = 'Title can not be blank';
const ERROR_NODE = 'Node can not be blank';

module.exports = function(options){

	var self = this;

    var c = options.controllers;
    var d = options.data;
    var superagent = options.superagent;
    var siteUrl = options.siteUrl;

    /**
     * Updates new path's title, receives event from title input
     * @param  {e} input change event
     */
    this.onTitleChange = function(e){
    	d.set(['createPath', 'title'], e.target.value);
    }
    this.validateForm = function(e){
    	var title = d.get(['createPath', 'title']);
    	var valid = true;
    	if( !title || !title.length ){
    		valid = false;
    		d.set(['createPath', 'titleError'], ERROR_TITLE);
    	} else {
    		d.set(['createPath', 'titleError'], '');
    	}
    	const nodes = d.get(['createPath', 'nodes']);
    	if( !nodes || !nodes.size ){ valid = false; }
    	nodes.forEach(function(node, i){
    		if( !node || !node.get('statement') ){
    			valid = false;
    			d.set(['createPath', 'nodes', i, 'error'], ERROR_NODE);
    		} else if( node.get('error') !== '' ){
    			d.set(['createPath', 'nodes', i, 'error'], '');
    		}
    	})
    	d.set(['createPath', 'valid'], valid);
    }
    this.handleCreateClick = function(e){
    	this.validateForm();
    	if( !d.get(['createPath', 'valid']) ){ return; }
    	var data = this._cleanFormData();

		superagent
	  		.post(siteUrl + '/path/create')
	  		.send(data)
	  		.end(function (err, response){
	  			if( err ){
	  				console.log(err);
	  			}
console.log('response', response.body)
	  		}
		);



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
    this._cleanFormData = function(){
    	var formData = d.get(['createPath']).toJS();
    	var cleanData = {title: formData.title};
    	cleanData.nodes = formData.nodes.map(function(n){
    		return {statement: n.statement}
    	});
    	return cleanData;
    }
    this._getBaseNode = function(){
    	return Immutable.fromJS({statement: '', error: ''});
    }
}