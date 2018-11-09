'use strict';

import async from 'async-es';

import Logger from 'logger';
import EventEmitter from './EventEmitter';
import Utility from 'utility';
import Forge from 'forge';

import IMAGE_HTML from './widgets/Image/index.html';


function Controller () {
  EventEmitter.call(this);

  const {info, warn, error} = Logger(true, this);

  info('Starting Application');
  var self = this;

  const API_KEY = 'R13CKlkCHh1gUIV1hrIXD4xTjNPKh6Vc';
  const LIMIT = 10;


  var lastKnownY = 0;
  var ticking = false;

  /**
   * Kicks off initialization of the application
   */
  const initialize = () => {

    async.waterfall([
      (callback) => {
        info('Initializing views ...');

        callback(null);
      },

      (callback) => {
        info('Initializing modals ...');
        callback(null);
      },

      (callback) => {
        info('Retrieving configuration ...');
        callback(null);
      }

    ], (err) => {
      if (err) {
        error(err);
        return;
      }

      info('Finished loading configuration');
      addListeners();

      window.addEventListener('scroll', (evt) => {
        lastKnownY = window.scrollY;
        if (!ticking) {
          window.requestAnimationFrame(function() {
            doSomething(lastKnownY);
            ticking = false;
          });

          ticking = true;
        }
      });
    });
  };

  var doSomething = (y) => {
    if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 500)) {
      var query = 'ryan+gosling';
      var offset = 25;
      var limit = 25;
      info('Getting more');
      getImages(query, offset, limit);
    }
  };


  var addListeners = () => {
    info('Adding listeners apples');
    document.getElementById('giphy-startBtn').addEventListener('click', (evt) => {
      info('Executing Test');

      var query = 'ryan+gosling';
      var offset = 0;
      var limit = 25;
      getImages(query, offset, limit);

    });
  };

  var getImages = (query, offset, limit, callback) => {
    info('Get Images ...');
    var xhr = $.get(`http://api.giphy.com/v1/gifs/search?q=${query}&api_key=${API_KEY}&limit=${limit}`);
    xhr.done(function(result) {
      info('success got data', result);

      result.data.forEach((elem) => {
        let url = elem.images.fixed_height.url;
        let dom = Forge.compile(IMAGE_HTML, {url});
        document.getElementById('images-container').appendChild(dom);
      });
    });
  };


  /**
   * Send an XMLHttpRequest to the server.
   * @param {String}   method   - GET, POST, PUT etc ...
   * @param {String}   uri      - The endpoint route
   * @param {JSON}     options  - Top level parameters mush be qs & body.
   * @param {Function} callback - The callback function
   */
  this.sendXHR = (method, uri, options, callback) => {
    Utility.sendXHR(method, uri, options, callback);
  };

  initialize();

  return this;
}

export default Controller;
