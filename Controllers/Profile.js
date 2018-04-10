
const gtservice = require('gtservice');


function getAccount(message,userId,callback){

    gtservice.AccountService.getById(userId,function(result){
        callback([{Config:[{Type:'Room',RoomId:userId}],Message:{Type:'GetAccount',data:result.data,error:result.error}}]);
    });

}

module.exports = {
    getAccount:getAccount
}