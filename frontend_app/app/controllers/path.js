module.exports = function(options){

    var c = options.controllers;
    var d = options.data;
    var superagent = options.superagent;
    var siteUrl = options.siteUrl;

    this.showCreate = function(){
    	d.set('view', 'createPath');
    }

    /**
     * Shows specifc path
     * @param  {int}  options.id  path id
     */
    this.show = function(options){
		superagent
	  		.get(siteUrl + '/api/path/get/' + options.id)
	  		.end(function (err, response){
	  			if( err ){
	  				// TODO: add error handling
	  				console.log(err);
	  				return;
	  			}
	  			if( response.body.status !== 'success' ){
	  				console.log(new Error(response.body.error));
	  				return;
	  			}
	  			d.set('path', response.body.data.path);
	  			d.set('view', 'path');
	  		}
		);
    }

    /**
     * Shows details for a node or link and loads affring/negating items
     * @param {options.item}  either a node or a link
     */
    this.setDetailItem = function(options){
    	d.set('detailItem', options.item);
        d.set('detailItemAffirming', false);
    }
}