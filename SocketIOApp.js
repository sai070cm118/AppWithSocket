
var io = require('socket.io')();
var uuid = require('uuid');
var configuration=require('./Controllers/Configuration');

var nJwt = require('njwt');
const SecurityManager = require('./Utilities/SecurityManager/index');

//Authenticatie the user.
var AsUser = io.of('/AsUser');

var _services=require('./Service/index');
var _proxyService=require('./Utilities/ProxyService/index');
var _appConfiguration=require('./Utilities/Configuration/index');


//============================================================================================//
//=================================  Actual Implementation  ==================================//
//============================================================================================//


AsUser.on('connection', function (socket) {


	SecurityManager.verifyToken(socket.request._query['Token'],function(err,verifiedJwt){
		if(err){
			console.log(err);
			socket.disconnect();
		}else{

			//Get the details of user
			_proxyService.GET(_appConfiguration.getUserManagerAPI()+'profile/'+verifiedJwt.body.Id,{},function(err,result){
				if(err){
					console.log(err);
					socket.disconnect();
				}
				else{
					
					if(result.error){
						socket.disconnect();
					}
					else{
						_services.ProfileService.getById(verifiedJwt.body.Id,function(profile){

							if(profile.error){

								if(profile.data.message== 'NOTFOUND'){
									result.data.Location=null;
									result.data.Live=true;
									result.data.AccountType=null;

									_services.ProfileService.add(result.data,function(addedProfile){
										//console.log('Profile is adding.');
									});
								}
							}
							else{
								result.data.Location=null;
								result.data.Live=true;
								result.data.AccountType=null;

								_services.ProfileService.update(result.data,function(updatedProfile){
									//console.log('Profile is updating.');
								})
							}

							
							socket._id=verifiedJwt.body.Id;
							socket.expireOn=verifiedJwt.body.exp;

							configuration.JoinInUserGroup(socket,verifiedJwt.body.Id);
						});
					}

					
				}

			});


			


		}
	});

	socket.on('disconnect',configuration.DisconnectRoute);
	socket.on('CtoS',function(inMessage){
		if(new Date < new Date(socket.expireOn*1000)){
			inMessage.UserId=socket._id;
			configuration.ManageUserRoute(socket,io,inMessage);
		}
		else{
			
			SecurityManager.verifyToken(socket.request._query['Token'],function(err,verifiedJwt){
				if(err){
					socket.disconnect();
				}else{
					socket._id=verifiedJwt.body.Id;
					socket.expireOn=verifiedJwt.body.exp;
					inMessage.UserId=socket._id;
					configuration.ManageUserRoute(socket,io,inMessage);
				}
			});
		}
		
	});

});


//============================================================================================//
//=================================  Actual Implementation  ==================================//
//============================================================================================//
	
module.exports = io;