module.exports = function(options){

    var self = this;
    var app = require('express')();
    const c = options.controllers;
    const r = options.response;
    const auth = options.auth;
    const validation = options.validation;

    app.post('/create', function(req, res){

        const user = auth.loginCheck(req, res);
        if( !user ){ return; }

        var data = validation.parsePathCreate(req, res);
        if( !data ){ return; }

    	data.user = user.id;

    	c.path.create(data, function(err, response){
    		if( err ){
    			console.log(err);
    			return res.json(r({errorCode: 'unknown'}));
    		}
    		return res.json(response);
    	});
    });

    app.get('/get/:pathId', function(req, res){
    	var id = validation.getNumericValue(req.params.pathId);
        if( !id ){ return res.json(r({errorCode: 'idInvalid'})); }
    	c.path.get({id: id}, function(err, response){
    		if( err ){
    			console.log(err);
    			return res.json(r({errorCode: 'unknown'}));
    		}
    		return res.json(response);
    	});
    });

    app.get('/get-recent/:page', function(req, res){
        var page = Number(req.params.page);
        if( !page ){ page = 1; }
        c.path.getRecent({page: page}, function(err, response){
            if( err ){
                console.log(err);
                return res.json(r({errorCode: 'unknown'}));
            }
            return res.json(response);
        });
    });

    app.get('/get-trending/:page', function(req, res){
        var page = Number(req.params.page);
        if( !page ){ page = 1; }
        c.path.getTrrending({page: page}, function(err, response){
            if( err ){
                console.log(err);
                return res.json(r({errorCode: 'unknown'}));
            }
            return res.json(response);
        });
    });

    return app;
}