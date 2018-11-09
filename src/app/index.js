import Logger from 'logger';
import Controller from './Controller';

var {info} = Logger(true);
var start = () => {
  info('Starting ...');
  var appCtrl = new Controller();
  window.c = appCtrl;
};

start();

export default start;
