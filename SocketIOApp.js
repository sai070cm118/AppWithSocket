
var io = require('socket.io')();
var Authentication_Mid=require('./Middlewares/Authentication_Mid.js');
var uuid = require('uuid');
var configuration=require('./Controllers/Configuration');

var nJwt = require('njwt');
const SecurityManager = require('gt.securitymanager');

//Authenticatie the user.
var AsUser = io.of('/AsUser').use(Authentication_Mid);


//============================================================================================//
//=================================  Actual Implementation  ==================================//
//============================================================================================//


AsUser.on('connection', function (socket) {

	SecurityManager.verifyToken(socket.request._query['Token'],function(err,verifiedJwt){
		if(err){
			console.log(err);
			socket.disconnect();
		}else{
			socket._id=verifiedJwt.body.Id;
			configuration.JoinInUserGroup(socket,verifiedJwt.body.Id);
		}
	});

	socket.on('disconnect',configuration.DisconnectRoute);
	socket.on('CtoS',function(message){
		message.data._id=socket._id;
		configuration.ManageUserRoute(socket,io,message);
	});

});


//============================================================================================//
//=================================  Actual Implementation  ==================================//
//============================================================================================//
	
module.exports = io;