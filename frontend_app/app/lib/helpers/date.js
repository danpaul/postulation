module.exports = function(options){
    /**
     * @param  {Immutable.map} path
     * @return {string}  formatted ranking/date string
     */
    this.format = function(dateString){
        var date = new Date(dateString);
        if( !date ){ return ''; }
        return date.getFullYear() + '-' +
               (date.getMonth() + 1).toString() + '-' +
               date.getDate();
    }
}