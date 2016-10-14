var helpers = {};

var options = {helpers: helpers}

helpers.date = new(require('./date'))(options);
helpers.ranking = new(require('./ranking'))(options);

module.exports = helpers;