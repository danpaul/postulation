const Immutable = require('immutable');

module.exports = function(options){

    var d = options.data;

    /**
     * Adds a message to the snackbar
     * @param {string} optinos.message
     */
    this.add = function(options){
        d.set(['snackbar', 'open'], true);
        d.set(['snackbar', 'message'], options.message);
    }
}