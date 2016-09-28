module.exports = function(options){

    var self = this;
    var app = require('express')();
    const c = options.controllers;
    const r = options.response;
    const auth = options.auth;
    const validation = options.validation;

    app.post('/create', function(req, res){

console.log(req.user);

        const user = auth.loginCheck(req, res);
        if( !user ){ return; }

console.log(JSON.stringify(req.body));

    	// do validation and sanitization
    	var data = req.body;
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
    	var id = req.params.pathId;
    	c.path.get({id: id}, function(err, response){
    		if( err ){
    			console.log(err);
    			return res.json(r({errorCode: 'unknown'}));
    		}
    		return res.json(response);
    	});
    });

    return app;
}