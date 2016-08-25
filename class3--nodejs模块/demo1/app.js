/**
 * Created by ChengFan on 2016/8/25.
 */

var sayHello = require('./sayHello');
sayHello();

var sayWorld = require('./sayWorld');
sayWorld();

var string = require('./stringMsg');
console.log(string);

var useExports = require('./useExports');
useExports.a();
useExports.b();
