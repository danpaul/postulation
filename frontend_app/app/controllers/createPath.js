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
     * @param  {string}  options.value
     * @param {Immutable.List}  options.dataLocation
     */
    this.onTitleChange = function(options){
    	d.set(options.dataLocation.push('title'), options.value);
    }
    /**
     * Handles updating path create form
     * @param  {options.dataLocation}
     */
    this.validateForm = function(options){
        const dataLocation = options.dataLocation;
    	const title = d.get(dataLocation.push('title'));
    	var valid = true;
        const titleError = dataLocation.push('titleError');
    	if( !title || !title.length ){
    		valid = false;
    		d.set(titleError, ERROR_TITLE);
    	} else {
    		d.set(titleError, '');
    	}
    	const nodes = d.get(dataLocation.push('nodes'));
    	if( !nodes || !nodes.size ){ valid = false; }
    	nodes.forEach(function(node, i){
            const nodeErrorLocation = dataLocation.push('nodes')
                                                  .push(i)
                                                  .push('error');
    		if( !node || !node.get('statement') ){
    			valid = false;
    			d.set(nodeErrorLocation, ERROR_NODE);
    		} else if( node.get('error') !== '' ){
    			d.set(nodeErrorLocation, '');
    		}
    	})
    	d.set(dataLocation.push('valid'), valid);
    }
    /**
     * Handles submitting form to create new path
     * @param  {Immutable.List}  options.dataLocation
     */
    this.handleCreateClick = function(options){
    	this.validateForm(options);
    	if( !d.get(options.dataLocation.push('valid')) ){ return; }
        var data = this._cleanFormData(options);
        const detailItem = d.get(['detailItem', 'item']);
        if( detailItem ){
            data.nodes.push(detailItem.toJS());
            data.charge = d.get(['detailItem', 'responseIsAffirming']);
        }

		superagent
	  		.post(siteUrl + '/api/path/create')
	  		.send(data)
	  		.end(function (err, response){
	  			if( err ){
	  				console.log(err);
	  			}
                if( response.body.status === 'success'){
                    console.log('success');
                } else {
                    console.log('error');
                }
                console.log(response.body)
	  		}
		);
    }
    /**
     * Updates a newly created node's statement
     * @param  {Immutable.List}  options.dataLocation
     * @param  {int}  options.index
     * @param  {string}  options.statement
     */
    this.updateNodeStatement = function(options){
        var l = options.dataLocation
                    .push('nodes')
                    .push(options.index)
                    .push('statement');
    	d.set(l, options.statement);
    }
    /**
     * Adds node to new path form
     * @param {Immutable.List}  options.dataLocation
     */
    this.addNode = function(options){
    	d.push(options.dataLocation.push('nodes'), this._getBaseNode());
    }
    this.handleAffirmRadioToggle = function(){
        var v = d.get('detailItemResponseAffirm');
        d.set(!v);
    }
    this.setResponseAffirm = function(){
        d.set(['detailItem', 'responseIsAffirming'], true);
    },
    this.setResponseNegate = function(){
        d.set(['detailItem', 'responseIsAffirming'], false);
    },
    /**
     * Handles formatting new path form data for submission
     * @param  {Immutable.List}  options.dataLocation
     */
    this._cleanFormData = function(options){
    	const formData = d.get(options.dataLocation).toJS();
    	var cleanData = {title: formData.title};
    	cleanData.nodes = formData.nodes.map(function(n){
    		return n.statement;
    	});
    	return cleanData;
    }
    this._getBaseNode = function(){
    	return Immutable.fromJS({statement: '', error: ''});
    }
}