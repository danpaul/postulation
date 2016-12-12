// var _ = require('underscore');
var async = require('async');
var config = require('../../config');

var PATHS_PER_PAGE = 100;

module.exports = function(options){
    var m = options.models;
    var c = options.controllers;

    this._updatePathsTrendRanks = function(){
        var self = this;
        var done = false;
        var page = 1;
        async.whilst(function(){ return !done; }, function(callback){
            m.path.getRecent({page: page, limit: PATHS_PER_PAGE}, function(err, paths){
                if( err ){ return callback(err); }

                // if paths is empty or past max time set done
                if( paths.length === 0 ||
                    self._pathHasExpired(paths[0]['created_at']) ){

                    done = true;
                    return callback();
                }

                // else increment page number
                page++;

                // update rankings
                async.eachLimit(paths, config.parallelLimit, function(path, callback){
                    m.path.updateTrendingRank({path: path}, callback);
                }, callback);
            });
        }, function(err){
            if( err ){ console.log(err); }
            m.path.clearExpiredTrending({}, function(err){
                if( err ){ return console.log(err); }
                console.log('Success updating paths trending strength');
            });            
        });
    }

    this._pathHasExpired = function(pathTimestamp){

        var pathTime = new Date(pathTimestamp).getTime();
        var now = new Date().getTime();

        return((now - pathTime) > config.trendLimit);
    }

    setInterval(this._updatePathsTrendRanks.bind(this),
                config.rankUpdateInterval);
}