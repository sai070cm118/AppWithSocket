var express = require('express'),
    path = require('path'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
	errorHandaller=require('./Middlewares/ErrorHandaller_Mid');
    app = express(),
    Logger_H=require('./Helpers/LoggerHelper.js').Logger_H,
	app.use('/', express.static(__dirname + '/'));

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Catch 404 and forward to error handler
//app.use(errorHandaller.Error404);

// Error Handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    //app.use(errorHandaller.Error500D);
}
// production error handler
// No stacktraces leaked to user
else{
	//app.use(errorHandaller.Error500P);
}

process.on('uncaughtException', function (err) {
  Logger_H.error(err);
  console.log(err);
  process.exit(1);
})
process.on('SIGINT', function() {
	Logger_H.info("Server is Intentinally stopped.");
	process.exit(0); 
}); 
process.on('exit', function(code){
	console.log(code);
	Logger_H.info("exit code is:"+code);
});
module.exports = app;
