var request = require('request');
var BaseApiUri = require('gtconfigurationmanager').getApiURI();

var ProxyService={

	GET:function(inURI,inJsonObj,getBack){
        
		request({ method: 'GET', uri:BaseApiUri+inURI, json:inJsonObj }, function(err,response,body){
			
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
		request({ method: 'POST', uri:BaseApiUri+inURI, json:inJsonObj }, function(err,response,body){
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
        
		request({ method: 'PUT', uri:BaseApiUri+inURI, json:inJsonObj }, function(err,response,body){
			
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
        
		request({ method: 'DELETE', uri:BaseApiUri+inURI, json:inJsonObj }, function(err,response,body){
			
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