module.exports = {
    /**
     * @param  {Immutable.map} path
     * @return {string}  formatted ranking/date string
     */
    getRankingString: function(path){
        var strength = Math.round(path.get('strength') * 100) / 100;
        var total = path.get('total');
        var trueVotes = total - path.get('false');
        var created = path.get('created_at');
        var rankingString = strength.toString() + ' ' + trueVotes.toString() + '/' +
                           total.toString();
        if( created ){
            rankingString += ' — ' + created;
        }
        return rankingString;
    } 
}