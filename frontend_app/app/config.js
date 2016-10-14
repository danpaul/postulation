var config = {};

config.recordHistory = true;
config.siteUrl = 'http://localhost:3000';

if( config.environment === 'production' ) {
    config.recordHistory = false;
    config.siteUrl = 'http://198.199.65.198';
}

module.exports = config;