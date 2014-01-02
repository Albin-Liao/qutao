module.exports =(function(){
	function Param(){

	}
	Param.prototype.getParam = function() {
		var obj = [];
		var paramstr = (window.location.hash).replace('#','');
		var params = paramstr.split('&');
		for (var i = 0; i < params.length; i++) {
			var param = params[i].split('=');
			var key = param[0];
			var value = param[1];
			obj[key] = value ;
		};
		return obj;
	};
	Param.prototype.setParam = function(obj) {
		var hash = '#category='+obj["category"]+
					'&keyword='+obj["keyword"]+
					'&page='+obj["page"]+'&order='+obj["order"];
		return hash;
	}
	return {
		ParamInit:Param
	}
})()