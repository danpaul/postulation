var schema = {}

var _ = require('underscore')
var async = require('async')

const SCHEMA = {
    node: function(table){
        table.increments();
        table.integer('user').default(0).index();
        table.text('statement');
    },
    link: function(table){
        table.increments();
        table.integer('from').default(0).index();
        table.integer('to').default(0).index();
        table.integer('path').default(0).index();
        table.boolean('to_final').default(false).index();
        table.boolean('final_is_link').default(false).index();
        table.boolean('charge').default(true).index();
        table.float('strength').default(0.0).index();
    },
    path: function(table){
        table.increments();
        table.integer('user').default(0).index();
        table.text('title');        
    },
    vote: function(table){
        table.integer('item').default(0).index();
        table.integer('user').default(0).index();
        table.integer('type').default(0).index();
        table.float('strength').default(0.0);
    },
    user: function(table){
        table.increments();
    }
}

// const SCHEMA = {
//     argument: function(table){
//         table.increments();
//         table.integer('true').default(0);
//         table.integer('false').default(0);
//         table.float('strength').default(0.0).index();
//         table.integer('user').default(0).index();
//     },
//     argument_applied: function(table){
//         table.increments();
//         table.integer('argument').default(0).index();
//         table.integer('applied_to').default(0).index();
//     },
//     premise: function(table){
//         table.increments();
//         table.integer('argument').index();
//         table.integer('order');
//         table.text('body');
//     },
//     vote: function(table){
//         table.integer('user').index();
//         table.integer('argument').index();
//         table.boolean('vote');
//     },
//     user: function(table){
//         table.increments();
//     }
// }

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