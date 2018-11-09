var path = require('path');
var express = require('express');
var router = express.Router();

const ENDPOINTS = require('./endpoints');

module.exports = () => {

  router.get('/', (req, res) => {
    res.sendFile(path.join(global.fileServeRoot, 'index.html'));
  });

  // 404 Error Page
  router.get('/404', (req, res) => {
    res.sendFile(path.join(global.fileServeRoot, '404.html'));
  });

  // 500 Error Page
  router.get('/500', (req, res) => {
    res.status(200).sendFile(path.join(global.fileServeRoot, '500.html'));
  });


  return router;
};
