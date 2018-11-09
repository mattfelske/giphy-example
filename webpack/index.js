'use strict';


// Load the environment specific webpack object and exports
var webpackConfig = require(`./${'local'}.js`);
module.exports = webpackConfig;
