var config = {};

// config.environment = process.env.NODE_ENV ?
//                      process.env.NODE_ENV : 'development';

// config.recordHistory = true;
config.siteUrl = 'http://localhost:3000';
// config.siteUrl = 'http://198.199.65.198';

// if( config.environment === 'production' ) {
//     config.recordHistory = false;
//     config.siteUrl = 'http://198.199.65.198';
// }

// config.siteUrl = 'http://198.199.65.198';

console.log('config.siteUrl', config.siteUrl);

module.exports = config;