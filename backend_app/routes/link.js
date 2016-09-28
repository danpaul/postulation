module.exports = function(options){

    var self = this;
    var app = require('express')();
    const c = options.controllers;
    const r = options.response;
    const auth = options.auth;
    const validation = options.validation;

    app.get('/response/:type/:charge/:id', function(req, res){

        var data = validation.parseLinkGet(req, res);
        if( !data ){ return; }

        data.joinData = true;

        c.link.getResponsesById(data, function(err, response){
            if( err ){
                console.log(err);
                return res.json(r({errorCode: 'unknown'}));
            }
            return res.json(response);
        });
    });

    return app;
}