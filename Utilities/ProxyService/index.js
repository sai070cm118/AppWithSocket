var request = require('request');

var ProxyService={

	GET:function(inURI,inJsonObj,getBack){
        
		request({ method: 'GET', uri:inURI, json:inJsonObj }, function(err,response,body){
			
			if (!err && response.statusCode == 200) {
				getBack(err,body);
			}
			else if(err){
				getBack(err);
			}
			else{
				getBack(null,body);
			}
		});
	},
	POST:function(inURI,inJsonObj,getBack){
		request({ method: 'POST', uri:inURI, json:inJsonObj }, function(err,response,body){
			if (!err && response.statusCode == 200) {
				getBack(err,body);
			}
			else if(err){
				getBack(err);
			}
			else{
				getBack(null,body);
			}
		});
	},
	PUT:function(inURI,inJsonObj,getBack){
        
		request({ method: 'PUT', uri:inURI, json:inJsonObj }, function(err,response,body){
			
			if (!err && response.statusCode == 200) {
				getBack(err,body);
			}
			else if(err){
				getBack(err);
			}
			else{
				getBack(null,body);
			}
		});
	},
	DELETE:function(inURI,inJsonObj,getBack){
        
		request({ method: 'DELETE', uri:inURI, json:inJsonObj }, function(err,response,body){
			
			if (!err && response.statusCode == 200) {
				getBack(err,body);
			}
			else if(err){
				getBack(err);
			}
			else{
				getBack(null,body);
			}
		});
	}
}

module.exports=ProxyService;