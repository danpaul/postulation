module.exports = function(options){

    var self = this;
    var app = require('express')();

    app.get('/', function(req, res){
        res.send('test');
    });

    return app;
}