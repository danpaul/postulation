module.exports = function(options){

    const PUBLIC_PROPS = ['username', 'id'];

    var self = this;
    var app = require('express')();
    const c = options.controllers;
    const r = options.response;
    const sqlLogin = options.sqlLogin;
    const auth = options.auth;
    const validation = options.validation;

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

    /**
     * Gets public user info
     */
    app.get('/:id', function(req, res){
        var id = validation.getNumericValue(req.params.pathId);
        if( !id ){ return res.json(r({errorCode: 'idInvalid'})); }
        sqlLogin.getUser(req.params.id, function(err, user){
            if( err ){
                console.log(err);
                return res.json(r({errorCode: 'unknown'}));
            }
            if( !user ){
                return res.json(r({data: {user: null}}));
            }
            return res.json(r({data: {user: getPublicProps(user)}}));
        });
    });
    return app;
}