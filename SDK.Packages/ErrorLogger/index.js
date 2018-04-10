var bunyan = require('bunyan');
var errorLogger = bunyan.createLogger({
  name: 'ErrorLogger',
  streams: [
    {
      level: 'fatal',
      stream: process.stdout         
    },
    {
      level: 'error',
      path: './Logs/gt-error.json' 
    },
    {
      level: 'warn',
      path: './Logs/gt-warn.json' 
    },
    {
      level: 'info',
      path: './Logs/gt-info.json'
    },
    {
      level: 'debug',
      path: './Logs/gt-debug.json' 
    },
    {
      level: 'trace',
      path: './Logs/gt-trace.json'
    }
  ]
});

module.exports=errorLogger;