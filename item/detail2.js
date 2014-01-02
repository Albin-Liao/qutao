var login = require("../common/islogin.js");
var selectUI = require("../common/top_select.js");
var detailobj = require("module/content.js");
var zoompic = require("../common/zoomPic.js");
var searchlist = require("../common/searchlist.js");
console.log(zoompic);
var detail_page = (function(){
	login.Login('../isLogin.do');
	var detail = new detailobj.DetailUI();
	searchlist.keyEvent();

	var _getURL = function(){
		return window.location.search.replace('?id=','');
	}
	var _callback = function(data){
		$(".itemtitle").html('<a href="javascript:void(0)">'+data.detial.title+'</a>');
		$(".detailMsg_subject").html(detail.outerRander(data));	
		$(".detailMsg_img").find("img")[0].onload = function(){
			zoompic.AutoResizeImage(328,238,this);
		}
	}
	var _getContent = function(){
		var proId = parseInt(_getURL(),10);
		var url = "../tps/info.do?id="+proId;
		detail.getData(url,_callback);
	}
	var _init = function(){
		_getContent();
	};
	return {
		init:_init
	}
})();
detail_page.init();
