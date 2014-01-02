var login = require("common/islogin.js");
var searchlist = require("common/searchlist.js");

module.exports = (function(){
	login.Login('isLogin.do');
	searchlist.keyEvent();
	searchlist.rec_focus('search.do?category=0');
	$("#s_text").bind('keydown', function(event) {
		if (event.keyCode === 13) {				
			return false;
		}
	});
	$("#s_text").bind('keyup', function(event) {
		var keyword = $(this).val();
		if (event.keyCode === 13) {	
			console.log(keyword);				
			window.location.href = "item/list.html#category=0&keyword="+keyword+"&page=1&order=date" ;
		}
	});
	$("#s_btn").bind('click.sub', function(event) {
		var keyword = $("#s_text").val();
		window.location.href = "item/list.html#category=0&keyword="+keyword+"&page=1&order=date" ;
	});
})()
