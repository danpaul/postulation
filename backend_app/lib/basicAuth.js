var auth = require('basic-auth')

module.exports = function(req, res, next){
    var credentials = auth(req)
    if (!credentials ||
        credentials.name !== 'post' ||
        credentials.pass !== 'postasdf') {

        res.statusCode = 401;
        res.setHeader('WWW-Authenticate', 'Basic realm="example"');
        return res.end('Access denied');
    } else {
        next();
    }
}