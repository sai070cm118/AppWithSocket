var winstonConsole = require('winston');
var debug = require('winston-dconsole');

winstonConsole.add(debug.Dconsole, {
    "timestamp": true,
    "level": "debug"
});



module.exports=winstonConsole;