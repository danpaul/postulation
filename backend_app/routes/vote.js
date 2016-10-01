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

        var voteData = validation.parseVoteCreate(req, res);
        if( !voteData ){ return; }

        voteData.user = user.id;

        c.vote.add(voteData, function(err, response){
            if( err ){
                console.log(err);
                return res.json(r({errorCode: 'unknown'}));
            }
            return res.json(response);
        });
    });

    app.get('/user/:userId/:type/:id', function(req, res){

        const user = auth.loginCheck(req, res);
        if( !user ){ return; }

        var options = validation.parseVoteGet(req, res);
        if( !options ){ return; }

        if( options.user !== user.id ){
            return res.json(r({errorCode: 'notAuthorized'}));
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