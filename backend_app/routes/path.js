module.exports = function(options){

// asdf
var TEST_USER = 666;

    var self = this;
    var app = require('express')();
    const c = options.controllers;
    const r = options.response;

    app.get('/', function(req, res){
        res.send('test');
    });

    app.post('/create', function(req, res){

    	// do validation and sanitization
    	var data = req.body;
    	data.user = TEST_USER;

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