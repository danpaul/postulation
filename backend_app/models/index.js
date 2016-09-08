const MODELS = ['link', 'node', 'path', 'user', 'vote'];

var _ = require('underscore');

module.exports = function(options){
	var self = this;
	_.each(MODELS, function(modelName){
		var Model = require('./' + modelName);
		self[modelName] = new Model({	knex: options.knex,
										models: self	});
	})
}