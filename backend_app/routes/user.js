module.exports = function(options){

    const PUBLIC_PROPS = ['username', 'id'];

// asdf
var TEST_USER = 666;

    var self = this;
    var app = require('express')();
    const c = options.controllers;
    const r = options.response;
    const sqlLogin = options.sqlLogin;

    const getPublicProps = function(user){
        var cleanUser = {};
        PUBLIC_PROPS.forEach(function(p){
            if( typeof(user[p] !== 'undefined') ){
                cleanUser[p] = user[p];
            } else {
                cleanUser[p] = null;
            }
        });
        return cleanUser;
    }

    app.get('/:id', function(req, res){
        // TODO: validation
        sqlLogin.getUser(req.params.id, function(err, user){
            if( err ){
                console.log(err);
                return res.json(r({errorCode: 'unknown'}));
            }
            if( !user ){
                return res.json(r({data: {user: null}}));
            }
            user = getPublicProps(user);
            return res.json(r({data: {user: user}}));
        });
    });

    return app;
}