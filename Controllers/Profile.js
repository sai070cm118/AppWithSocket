
const _gtservice = require('../Service/index');


function getProfile(message,userId,callback){

    _gtservice.AccountService.getById(userId,function(result){
        callback([{Config:[{Type:'Room',RoomId:userId}],Message:{Type:'GetAccount',data:result.data,error:result.error}}]);
    });

}

module.exports = {
    getProfile:getProfile
}