
const Profile = require('./Profile');



module.exports = function(message,userId,callback) {
    
    var messageData=message.data;

    switch(message.controller){
        case 'Profile':
            switch(message.method){
                case 'GetAccount':
                    Profile.getAccount(messageData,userId,callback);
                    break;
                default:
                    break;
            }
        break;
        default:
        break;
    }
}

