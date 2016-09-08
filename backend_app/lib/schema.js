var _ = require('underscore')
var async = require('async')

const SCHEMA = {
    node: function(table){
        table.increments();
        table.integer('user').default(0).index();
        table.text('statement');
        table.integer('true').default(0);
        table.integer('false').default(0);
        table.integer('total').default(0).index();
        table.float('strength').default(0.0).index();
    },
    link: function(table){
        table.increments();
        table.integer('from').default(0).index();
        table.integer('to').default(0).index();
        table.integer('path').default(0).index();
        table.boolean('to_final').default(false).index();
        table.boolean('final_is_link').default(false).index();
        table.boolean('charge').default(true).index();
        table.float('strength').default(0.0).index(); // gets from path
    },
    path: function(table){
        table.increments();
        table.integer('user').default(0).index();
        table.integer('true').default(0);
        table.integer('false').default(0);
        table.integer('total').default(0).index();
        table.float('strength').default(0.0).index();
        table.text('title').default('');
    },
    vote: function(table){
        table.integer('item').default(0).index();
        table.integer('user').default(0).index();
        table.integer('type').default(0).index();
        table.boolean('true').default(true);
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