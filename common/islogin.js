var Cookies = require("logout.js");
//console.log(Cookies);
module.exports = (function(){
	var rtxAccount = '';

	$(".my_msg").bind('click',function(event){
		if(!Cookies.GetCookie('UN')){
			alert("您还未登录");
			event.preventDefault();
		}
	});
	$(".publish").bind('click',function(event){
		if(!Cookies.GetCookie('UN')){
			alert("您还未登录");
			event.preventDefault();
		}
	});
	
	if (document.all) {   //IE浏览器
		$("#s_text").attr("maxLength",30);
	}else{
						//非IE浏览器
		$("#s_text").attr("maxlength",30);
	}
	

	function login(url){
		$.ajax({
			type:"GET",               
			url:url,  
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			cache:false,
			success:function(data){
				if (data.ret===true) {
					rtxAccount = data.userId;
					var htmlstr = [];
						htmlstr.push('<a href="javascript:void(0)" id="logout" class="login_msg">退出</a>');
						htmlstr.push('<span class="login_msg">&nbsp;</span>');
						htmlstr.push('<span class="login_msg cut">|</span>');
						htmlstr.push('<span class="login_msg">&nbsp;</span>');
					$("#qsso-login").html('<a href="/personal/self.html">'+data.name+'</a>');
					$(htmlstr.join('')).insertBefore("#qsso-login");
					$("#logout").bind('click', function(event) {
						Cookies.DeleteCookie('UN');
						Cookies.DeleteCookie('JSESSIONID');
						window.location.href = '/';
					});
				};			
			},
			error:function(msg) {
			}

		});
	};
	return{
		Login:login,   //"isLogin.do"
		RTX:rtxAccount,
		cookies:Cookies
	}
})()