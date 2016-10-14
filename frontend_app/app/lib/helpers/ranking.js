module.exports = function(options){
    /**
     * @param  {Immutable.map} path
     * @return {string}  formatted ranking/date string
     */
    this.getRankingString = function(path){
        var strength = Math.round(path.get('strength') * 100) / 100;
        var total = path.get('total');
        var trueVotes = total - path.get('false');
        var rankingString = strength.toString() + ' ' + trueVotes.toString() + '/' +
                           total.toString();
        var created = path.get('created_at');
        if( created ){ 
            rankingString += ' — ' + options.helpers.date.format(created);
        }
        return rankingString;
    } 
}