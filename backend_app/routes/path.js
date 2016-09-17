module.exports = function(options){

// asdf
var TEST_USER = 666;

    var self = this;
    var app = require('express')();
    const c = options.controllers;

    app.get('/', function(req, res){
        res.send('test');
    });

    app.post('/create', function(req, res){

console.log(req.body);

    	// do validation and sanitization
    	var data = req.body;
    	data.user = TEST_USER;

    	c.path.create(data, function(err, response){
    		if( err ){
    			return console.log(err);
    			// TODO
    			// return generic error
    		}
    		return res.json(response);
    	})


		// res.json({foo: 'bar'});
        // res.send('test');
    });

    return app;
}