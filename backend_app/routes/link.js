module.exports = function(options){

    var self = this;
    var app = require('express')();
    const c = options.controllers;
    const r = options.response;

    app.get('/response/:type/:charge/:id', function(req, res){
        var d = {   id: req.params.id,
                    type: req.params.type,
                    charge: (req.params.charge === 'affirm'),
                    joinData: true  };
        c.link.getResponsesById(d, function(err, response){
            if( err ){
                console.log(err);
                return res.json(r({errorCode: 'unknown'}));
            }
            return res.json(response);
        });
    });

    return app;
}