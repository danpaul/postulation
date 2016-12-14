module.exports = function(options){
    /**
     * @param  {Immutable.map} path
     * @return {string}  formatted ranking/date string
     */
    this.getRankingString = function(path){
// asdf
// console.log('path', path.toJS());
        var strength = Math.round(path.get('strength') * 100) / 100;
        var total = path.get('total');
        var trueVotes = total - path.get('false');
        var rankingString = strength.toString() + ' ' + trueVotes.toString() + '/' +
                            total.toString();
        var created = path.get('created_at');
        if( created ){ 
            rankingString += ' — ' + options.helpers.date.format(created);
        }
        rankingString += ' — ' + path.getIn(['user', 'username']);
        return rankingString;
    }
}