module.exports = function(options){

    var self = this;
    var app = require('express')();
    const constants = options.constants;
    const c = options.controllers;
    const r = options.response;

// ASDF
var TEST_USER = 666;

    app.post('/', function(req, res){

        // TODO: input validation/sanitization
        // 
        //
        var options = {
            item: req.body.id,
            type: req.body.type,
            true: req.body.true,
            user: TEST_USER
        }

        c.vote.add(options, function(err, response){
            if( err ){
                console.log(err);
                return res.json(r({errorCode: 'unknown'}));
            }
            return res.json(response);
        });
    });

    app.get('/user/:userId/:type/:id', function(req, res){

        // TODO: input validation/sanitization
        // 
        //
        var options = {
            user: req.params.userId,
            type: req.params.type,
            item: req.params.id
        }

        c.vote.get(options, function(err, response){
            if( err ){
                console.log(err);
                return res.json(r({errorCode: 'unknown'}));
            }
            return res.json(response);
        });
    });

    return app;
}