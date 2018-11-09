'use strict';

/**
 * A browser side event emitter object that allows an object that uses it, to emitter
 * updates as needed.
 */
var EventEmitter = function () {

  // tracks the registered callback per event.
  var evts = {};

  // Components register for callbacks to be trigger when an emit is fired.
  this.on = (name, callback) => {
    if (typeof name !== 'string' || typeof callback !== 'function') {
      return;
    }
    if (!evts[name]) {
      evts[name] = [callback];
    } else {
      evts[name].push(callback);
    }
  };

  // A component triggers this function to run all associated callback functions;
  // Note: 'data' is deep cloned.
  this.trigger = (name, data) => {
    if (evts[name]) {
      let jsonData = (data) ? JSON.parse(JSON.stringify(data)) : undefined;
      for (var i = 0; i < evts[name].length; i++) {
        evts[name][i](jsonData);
      }
    }
  };
};

module.exports = EventEmitter;
