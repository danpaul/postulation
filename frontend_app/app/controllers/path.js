const Immutable = require('immutable');

// module.exports = function(options){
export default function Path(options){

    var c = options.controllers;
    var d = options.data;
    var superagent = options.superagent;
    var siteUrl = options.siteUrl;

    this.showCreate = function(){ d.set('view', 'createPath'); }

    /**
     * Shows specifc path
     * @param {int}  options.id  path id
     * @param {array} options.location optional, if set, will set the path to given location in data
     *                                 defaults to ['path']
     */
    this.show = function(options){
        var self = this;
        var location = options.location ? options.location : ['path'];
		superagent
	  		.get(siteUrl + '/api/path/get/' + options.id)
	  		.end(function (err, response){
	  			if( err ){
	  				console.log(err);
                    c.snackbar.add({message: c.error.unknown});
	  				return;
	  			}
	  			if( response.body.status !== 'success' ){
                    c.snackbar.add({message: response.body.error});
	  				console.log(new Error(response.body.error));
	  				return;
	  			}
                var path = response.body.data.path;
                self._parsePath(path, location);
                path.location = location;
	  			d.set(location, path);
	  			d.set('view', 'path');
	  		}
		);
    }

    /**
     * Shows recent paths
     * @param  {options.page}
     */
    this.showRecent = function(options){
        d.set('view', 'paths');
        this.loadRecent(options);
    }

    this.loadRecentHome = function(options){
        options.dataLocation = Immutable.List(['recentPathsHome']);
        this._loadRecent(options);
    }

    this.loadTrendingHome = function(options){
        options.dataLocation = Immutable.List(['trendingPathsHome']);
        options.trending = true;
        this._loadRecent(options);
    }

    /**
     * Loads recent paths
     * @param  {int}  options.page
     * @param  {array}  options.dataLocation
     * @param {bool} options.trending optional, will load trending paths if true
     */
    this._loadRecent = function(options){
        var self = this;
        const loadingLocation = options.dataLocation.push('loading');
        const pathsLocation = options.dataLocation.push('paths');
        let url = siteUrl + '/api/path/get-recent/' + options.page;
        if( options.trending ){
            url = siteUrl + '/api/path/get-trending/' + options.page;
        }

        d.set(loadingLocation, true);
        superagent
            .get(url)
            .end(function (err, response){
                d.set(loadingLocation, true);
                if( err ){
                    c.snackbar.add({message: c.error.unknown});
                    console.log(err);
                    return;
                }
                if( response.body.status !== 'success' ){
                    c.snackbar.add({message: response.body.error});
                    console.log(new Error(response.body.error));
                    return;
                }
                d.set(pathsLocation, response.body.data.paths);
            }
        );
    }

    this._parsePath = function(path, locationIn){

        const location = Immutable.List.isList(locationIn) ? locationIn :
                                                             Immutable.fromJS(locationIn);
        var isNegatingResponse = false;
        let nodes = path.path;
        for( var i = 0; i < path.path.length; i++ ){
            let next = nodes[i + 1] ? nodes[i + 1] : null;
            let link = next ? next : null;
            if( link ){
                link.location = location.push(i + 1);
                nodes[i]['link'] = link;
            } else {
                nodes[i]['link'] = null;
            }
            nodes[i]['isConclusion'] = nodes.size === (i + 1);
            nodes[i]['location'] = location.push(i);

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
            // item.responsesAffirm = {argument: ''}
            item.responses = {negate: '', affirm: ''};
        }
        path.isNegatingResponse = isNegatingResponse;
        if( location ){ path.location = location; }
        return path;
    }

    /**
     * Shows details for a node or link and loads affirming/negating items
     * @param {options.item}  either a node or a link
     * @param {options.location} Immutable.map location within the stor of the path
     */
    this.setDetailItem = function(options){

        // asdf - legacy to remove
    	d.set(['detailItem', 'item'], options.item);
        this.loadResponsePaths({item: options.item,
                                location: options.location,
                                charge: true});

        this.loadResponsePaths({item: options.item,
                                location: options.location,
                                charge: false});
    }

    this.unsetDetailItem = function(options){
        d.set(['detailItem', 'item'], null);
    }

    /**
     * @param  {object}  options.item
     * @param {options.location} Immutable.map location within the stor of the path
     * @param  {boolean}  options.charge
     */
    this.loadResponsePaths = function(options){
        var self = this;
        var type = options.item.get('type') === 'node' ? 'node' : 'link';
        var direction = options.charge ? 'affirm' : 'negate';
        var id = options.item.get('id');
        var url = siteUrl + '/api/link/response/' + type + '/' + direction + '/' + id;

        // var location = null;
        var location = options.location.push('responsesAffirm');
        if( !options.charge ){
            location = options.location.push('responsesNegate');            
        }

        superagent
            .get(url)
            .end(function (err, response){
                if( err ){
                    c.snackbar.add({message: c.error.unknown});
                    console.log(err);
                    return;
                }
                if( response.body.status !== 'success' ){
                    c.snackbar.add({message: response.body.error});
                    console.log(new Error(response.body.error));
                    return;
                }
                response.body.data.paths.forEach(function(p, index){
                    var l = location.push(index);
                    self._parsePath(p, l);
                });
                if( options.charge ){

                    d.set(location, response.body.data.paths)

                    // legacy to remove - asdf
                    d.set(['detailItem', 'affirming'], response.body.data.paths);

                } else {
                    // var location = options.location.push('responsesNegate');
                    d.set(location, response.body.data.paths)

                    // legacy to remove - asdf - AND REMOVE FROM DATA STRUCTURE
                    d.set(['detailItem', 'negating'], response.body.data.paths);

                }
            });
    }
}