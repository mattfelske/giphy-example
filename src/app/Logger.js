/* eslint no-console:0 */

module.exports = (isDebug, klass) => {
  var obj = {};
  if (isDebug) {
    if (klass) {
      obj.info = console.log.bind(window.console, `[${klass.constructor.name}] `);
      obj.warn = console.warn.bind(window.console, `[${klass.constructor.name}] `);
      obj.error = console.error.bind(window.console, `[${klass.constructor.name}] `);
    } else {
      obj.info = console.log.bind(window.console, '');
      obj.warn = console.warn.bind(window.console, '');
      obj.error = console.error.bind(window.console, '');
    }
  } else {
    obj.info = () => {};
    obj.warn = () => {};
    obj.error = () => {};
  }

  return obj;
};
