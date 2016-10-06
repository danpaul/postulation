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
        var self = this;
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
                var path = response.body.data.path;
                self._parsePath(path);
	  			d.set('path', response.body.data.path);
	  			d.set('view', 'path');
	  		}
		);
    }

    /**
     * Shows recent paths
     * @param  {options.page}
     */
    this.showRecent = function(options){
        var self = this;
        d.set('view', 'paths');
        d.set(['recentPaths', 'loading'], true);
        superagent
            .get(siteUrl + '/api/path/get-recent/' + options.page)
            .end(function (err, response){
                d.set(['recentPaths', 'loading'], false);
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
                d.set(['recentPaths', 'paths'], response.body.data.paths);
            }
        );
    }

    this._parsePath = function(path){
        var isNegatingResponse = false;
        for( var i = 0; i < path.path.length; i++ ){
            var item = path.path[i];
            // check if second to last item and hide it and remaining element
            if( i === path.path.length - 2 &&
                item.type === 'link' &&
                !item.charge  ){
                item.hidden = true;
                isNegatingResponse = true;
            } else {
                item.hidden = isNegatingResponse;
            }
        }
        path.isNegatingResponse = isNegatingResponse;
        return path;
    }

    /**
     * Shows details for a node or link and loads affirming/negating items
     * @param {options.item}  either a node or a link
     */
    this.setDetailItem = function(options){
    	d.set(['detailItem', 'item'], options.item);
        this.loadResponsePaths({item: options.item, charge: true});
        this.loadResponsePaths({item: options.item, charge: false});
    }

    /**
     * @param  {object}  options.item
     * @param  {boolean}  options.charge
     */
    this.loadResponsePaths = function(options){
        var self = this;
        var type = options.item.get('type') === 'node' ? 'node' : 'link';
        var direction = options.charge ? 'affirm' : 'negate';
        var id = options.item.get('id');
        var url = siteUrl + '/api/link/response/' + type + '/' + direction + '/' + id;

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
                response.body.data.paths.forEach(function(p){
                    self._parsePath(p);
                });
                if( options.charge ){
                    d.set(['detailItem', 'affirming'], response.body.data.paths);
                } else {
                    d.set(['detailItem', 'negating'], response.body.data.paths);
                }
            });
    }
}