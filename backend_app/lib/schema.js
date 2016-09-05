var schema = {}

var _ = require('underscore')
var async = require('async')

const SCHEMA = {
    argument: function(table){
        table.increments();
        table.integer('true').default(0);
        table.integer('false').default(0);
        table.float('strength').default(0.0).index();
        table.integer('user').default(0).index();
    },
    argument_applied: function(table){
        table.increments();
        table.integer('argument').default(0).index();
        table.integer('applied_to').default(0).index();
    },
    premise: function(table){
        table.increments();
        table.integer('argument').index();
        table.integer('order');
        table.text('body');
    },
    vote: function(table){
        table.integer('user').index();
        table.integer('argument').index();
        table.boolean('vote');
    },
    user: function(table){
        table.increments();
    }
}

module.exports = function(options,
                          callbackIn){
    async.eachSeries(_.keys(SCHEMA), function(tableName, callback){
        options.knex.schema.hasTable(tableName)
            .then(function(exists) {
                if( exists ){
                    callback();
                    return null;
                }
                return options.knex.schema.createTable(tableName,
                                                SCHEMA[tableName])
                    .then(function(){ return callback(); })
                    .error(callback)
            })
            .error(callback);
    }, callbackIn);
}