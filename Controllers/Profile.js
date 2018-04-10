
const _gtservice = require('../Service/index');


function getMyProfile(message,userId,callback){

    _gtservice.ProfileService.getById(userId,function(result){
        callback([{Config:[{Type:'MySelf',RoomId:userId}],Message:{Type:'MyProfile',data:result.data,error:result.error}}]);
    });

}

module.exports = {
    getMyProfile:getMyProfile
}