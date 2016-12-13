var _ = require('underscore');
var config = require('../../config');

var decay = require('decay');
var wilsonScore = decay.wilsonScore();

const TABLE = 'path';

module.exports = function(options){
	var k = options.knex;

	this.create = function(options, callback){
		k(TABLE).insert({user: options.user, title: options.title})
				.asCallback(callback);
	}

	this.get = function(options, callback){
		k(TABLE).where('id', options.id).asCallback(callback);
	}

	/**
	 * @param  {number}  options.limit
	 * @param  {number}  options.page
	 */
	this.getRecent = function(options, callback){
		const offset = options.limit * (options.page - 1);
		k(TABLE).select('*')
			.orderBy('created_at', 'desc')
			.limit(options.limit)
			.offset(offset)
			.asCallback(callback);
	}

	/**
	 * @param  {number}  options.limit
	 * @param  {number}  options.page
	 */
	this.getTrending = function(options, callback){
		const offset = options.limit * (options.page - 1);
		k(TABLE).select('*')
			.orderBy('trend_strength', 'desc')
			.limit(options.limit)
			.offset(offset)
			.asCallback(callback);
	}

	/**
	 * Updates path's trending rank
	 * @param  {object}   options.path
	 */
	this.updateTrendingRank = function(options, callback){
		var path = options.path;

        var pathTime = new Date(path.created_at).getTime();
        var now = new Date().getTime();
        var timeRemaining = config.trendLimit - (now - pathTime);
        var timeStrength = timeRemaining / config.trendLimit;
        var trendingStrength = wilsonScore(path.true, path.false) * timeStrength;

        k(TABLE)
			.where('id', '=', path.id)
			.update({
			  	trend_strength: trendingStrength
			})
			.asCallback(callback);
	}

	this.clearExpiredTrending = function(options, callback){
		var cutoff = (new Date().getTime()) - config.trendLimit;
		var cutoffTimestamp = new Date(cutoff);

        k(TABLE)
			.where('created_at', '<', cutoffTimestamp)
			.update({
			  	trend_strength: 0.0
			})
			.asCallback(callback);
	}
}