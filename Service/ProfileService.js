var _repository=require('../Repository/index');

var Service={
    add:function(User,callback){
        _repository.ProfileRepository.add(User,callback);
    },
    update:function(User,callback){
        _repository.ProfileRepository.update(User,callback);
    },
    getById:function(Id,callback){
        _repository.ProfileRepository.getById(Id,callback);
    },
    getAll:function(name,callback){
        _repository.ProfileRepository.getByName(name,callback);
    }
};
module.exports=Service;


