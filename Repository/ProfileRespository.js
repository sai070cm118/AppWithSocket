var Models=require('./Models.js');
var moment = require('moment');

var Repository={
    
    add:function(token,callback){
        
    },
    update:function(token,callback){

    },
    delete:function(Id,callback){
        
    },
    getAll(callback){

    },
    getById(id,callback){

        console.log(id);

        Models.Profile
        .where({_id: id})
        .fetch({ withRelated: []})
        .then(function (Profile) {
            if (!Profile) {
                callback({error: true, data: {}});
            }
            else {
                callback({error: false, data: Profile.toJSON()});
            }
        })
        .catch(function (err) {
            console.log(err);
            callback({error: true, data: {message: 'Unable to get profile.'}});
        });
    }

}

module.exports=Repository;