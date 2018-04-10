
var io = require('socket.io')();
var uuid = require('uuid');
var configuration=require('./Controllers/Configuration');

var nJwt = require('njwt');
const SecurityManager = require('./Utilities/SecurityManager/index');

//Authenticatie the user.
var AsUser = io.of('/AsUser');


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
	socket.on('CtoS',function(inMessage){
		inMessage.data._id=socket._id;
		configuration.ManageUserRoute(socket,io,inMessage);
	});

});


//============================================================================================//
//=================================  Actual Implementation  ==================================//
//============================================================================================//
	
module.exports = io;