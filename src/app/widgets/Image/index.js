/* globals c3 */
'use strict';

import Utility from 'utility';
import Forge from 'forge';
import Logger from 'logger';

import HTML from './index.html';
import styles from './index.css'; // eslint-disable-line

var IMAGE = function (ctrl, container, url) {
  const {info, error} = Logger(true, this);
  var self = this;

  var c = ctrl;
  var currentUrl = url;

  if (!ctrl) return error(new Error('Missing controller object'));
  if (!container) return error(new Error('Missing container object'));
  if (!url) return error(new Error('Missing image url'));


  var initialize = () => {
    
  };


  var build = () => {
    let json = {id: ''};

    var DOM = Forge.compile(HTML, json);
    container.appendChild(DOM);
  };

  initialize();

  return this;

};

module.exports = IMAGE;
