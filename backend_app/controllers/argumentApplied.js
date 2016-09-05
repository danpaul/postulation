var _ = require('underscore');
const TABLE = 'argument_applied';

module.exports = function(options){
	var k = options.knex;
	var c = options.controllers;
	var r = options.response;

	/**
	 * @param {int}  options.argument
	 * @param {int}  options.appliedTo
	 */
	this.create = function(options, callback){
		k(TABLE)
			.insert({	argument: options.argument,
						applied_to: options.appliedTo 	})
			.asCallback(function(err){
				if( err ){ return callback(err); }
				return callback(null, r());
			})
	}

	/**
	 * Gets arguments applied to another argument
	 * @param  {int}   options.argument
	 */
	this.get = function(options, callback){
// return;
		k(TABLE)
			.where('applied_to', '=', options.argument)
			.asCallback(function(err, arguments){
				if( err ){ return callback(err); }
				var data = {};
				if( !arguments.length ){
					data.arguments = [];
					return callback(null, r({data: data}));
				}
// console.log('arguments', arguments)
				var argumentIds = _.map(arguments, function(a){
					return a.argument;
				});
// console.log(argumentIds);
				c.argument.getIn({arguments: argumentIds}, callback);

// console.log(argumentIds)

		})
	}
}