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
                    // TODO: add error handling
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

// asdf
// console.log('options', options.item.toJS());

    	d.set('detailItem', options.item);
        d.set('detailItemAffirming', false);

        options.affirm = true;
        this.loadResponsePaths(options);

        // options.affirm = false;
        // this.loadResponsePaths(options);
    }


    /**
     * @param  {objects}  options.item
     * @param  {objects}  options.charge
     */
    this.loadResponsePaths = function(options){
        var type = options.item.get('type') === 'node' ? 'node' : 'link';
        var charge = options.affirm ? 'affirm' : 'negate';
        var id = options.item.get('id');
        var url = siteUrl + '/api/link/response/' + type + '/' + charge + '/' + id;
// console.log(url)
        superagent
            .get(url)
            .end(function (err, response){
                if( err ){
                    // TODO: add error handling
                    console.log(err);
                    return;
                }
                if( response.body.status !== 'success' ){
                    // TODO: add error handling
                    console.log(new Error(response.body.error));
                    return;
                }
            });
    }

    // this.loadAffirmingPaths(option)
}