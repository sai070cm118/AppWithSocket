var Models=require('./Models.js');
var moment = require('moment');

var Repository={
    
    add:function(Profile,callback){
        Models.Profile
            .forge({
                _Id:Profile._id,
                Email:Profile.Email,
                FirstName: Profile.FirstName,
                LastName: Profile.LastName,
                ProfileName: Profile.ProfileName,
                ProfilePic: Profile.ProfilePic,
                Live: Profile.Live || false,
                IsActive:Profile.IsActive || false,
                Status:0
            })
            .save()
            .then(function (ProfileDbModel) {
                callback({error: false, data:  Profile._id});
            })
            .catch(function (err) {
                callback({error: true, data: {message: 'Add failed for profile.'}});
            });
    },
    update:function(Profile,callback){
        Models.Profile
        .forge({_id: Profile._id})
        .fetch()
        .then(function(model) {
            model.set({
                Email:Profile.Email || model.get('Email'),
                FirstName: Profile.FirstName || model.get('FirstName'),
                LastName: Profile.LastName || model.get('LastName'),
                ProfileName: Profile.ProfileName || model.get('ProfileName'),
                ProfilePic: Profile.ProfilePic || model.get('ProfilePic'),
                Location: Profile.Location || model.get('Location'),
                Live: Profile.Live !=null ? Profile.Live : model.get('Live'),
                IsActive:Profile.IsActive!=null ? Profile.IsActive : model.get('IsActive'),
                Status:Profile.Status || model.get('Status'),
                AccountType:Profile.AccountType || model.get('AccountType')
            })
            .save()
            .then(function () {
                callback({error: false, data: model.toJSON()});
            })
            .catch(function (err) {
                callback({error: true, data: {message: 'Update failed for profile.'}});
            });
        });
    },
    delete:function(Id,callback){
        
    },
    getAll(callback){

    },
    getById(id,callback){

        Models.Profile
        .where({_id: id})
        .fetch({ withRelated: []})
        .then(function (Profile) {
            if (!Profile) {
                callback({error: true, data: {message:'NOTFOUND'}});
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