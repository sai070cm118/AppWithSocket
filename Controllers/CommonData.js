
const _gtservice = require('../Service/index');


function getByAdmin(message,userId,callback){

    _gtservice.CGroupService.getByAdmin(userId,function(result){
        callback([{Config:[{Type:'MySelf',RoomId:userId}],Message:{Type:'AdminGroups',data:result.data,error:result.error}}]);
    });

}

function pushError(message,userId,callback){
    callback([{Config:[{Type:'MySelf',RoomId:userId}],Message:{Type:'Error',data:message.data,error:message.error}}]);
}

function eventResponse(message,userId,callback){
    callback([{Config:[{Type:'MySelf',RoomId:userId}],Message:{Type:'Response',data:message}}]);
}

module.exports = {
    getByAdmin:getByAdmin,
    pushError:pushError,
    eventResponse:eventResponse
}