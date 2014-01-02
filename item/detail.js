var login = require("../common/islogin.js");
var selectUI = require("../common/top_select.js");
var detailobj = require("module/content.js");
var picobj = require("module/pic.js");
var searchlist = require("../common/searchlist.js");

var detail_page = (function(){
	login.Login('../isLogin.do');
	searchlist.getHotwords('hotkey.do');
	searchlist.keyEvent();
	var category = $("#c_select").val();
	searchlist.rec_focus('../search.do?category='+category);   //顶部搜索提示

	var detail = new detailobj.DetailUI();
	var picUI = new picobj.PicUI();
	var _getPic = function(data){
			picUI.pic_click();
			var len = data.imgs.length-6;
			if(len>0){
				picUI.next_click(len);
				picUI.pre_click();
			}
			
	};	
	var _callback = function(data){

		$(".classes").html('<a href="list.html#category='+data.item.categoryCode+'&page=1&order=date">'+data.item.categoryName+'</a>');
		$(".itemtitle").html('<a href="javascript:void(0)">'+data.item.title+'</a>');

		$(".detailMsg_subject").html(detail.rander(data));	
		$(".thumb_main").html(picUI.rander(data.imgs));
		_getPic(data);
	}
	var getURL = function(){
		return window.location.search.replace('?productId=','');
	}

	var _getContent = function(){
		
		var proId = parseInt(getURL(),10);
		var url = "itemdetail.do?productId="+proId ;
			detail.getData(url,_callback);	
	};
	var _init = function(){
		_getContent();
		
	};
	return {
		init:_init
	}
})();
detail_page.init();
