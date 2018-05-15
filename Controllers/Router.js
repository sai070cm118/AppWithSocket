
const controllers = require('./index');



module.exports = function(message,userId,callback) {
    
    var messageData=message.data;

    switch(message.controller){
        case 'Profile':
            switch(message.method){
                case 'GetMyProfile':
                    controllers.Profile.getMyProfile(messageData,userId,callback);
                    break;
                default:
                    break;
            }
        break;
        default:
        break;
    }
}

