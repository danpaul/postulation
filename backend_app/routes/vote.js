module.exports = function(options){

    var self = this;
    var app = require('express')();
    const constants = options.constants;
    const c = options.controllers;
    const r = options.response;
    const auth = options.auth;
    const validation = options.validation;

    app.post('/', function(req, res){

        const user = auth.loginCheck(req, res);
        if( !user ){ return; }

        var options = {
            item: req.body.id,
            type: req.body.type,
            true: req.body.true,
            user: user.id
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