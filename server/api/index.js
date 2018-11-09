// External dependencies.
const express  = require('express');
const router   = express.Router();

module.exports = function() {

  const API_ROOT     = require('./root')();

  router.use('/', API_ROOT);

  return router;
};
