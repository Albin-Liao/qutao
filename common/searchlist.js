var paramInit = require("../item/module/initParam.js");
var Param = new paramInit.ParamInit();
module.exports ={
	index: -1,
	rec_hover:function(){
		$(".rec_search li").hover(
			function(){
				$(this).addClass('hover');
			},
			function(){
				$(this).removeClass('hover');
		});
	},
	rec_click:function(){
		$(".rec_search li").bind('click', 
			function(event) {
				$("#s_text").val($(this).html());
				$(".rec_search").hide();
				$(".rec_box").addClass('zindex0').removeClass('zindex99');
				$("#s_btn").trigger('click.btn');
		});

		$("body").bind('click', function(event) {
				var tar = event.target.tagName;
				if(tar!='INPUT'){
					$(".rec_search").hide();
					$(".rec_box").addClass('zindex0').removeClass('zindex99');
				}
		});
	},
	rec_focus:function(url){
		this.rec_change(url);
	},
	rec_change:function(url){
		var that = this ;
		var lastTime ;
		$("#s_text").bind('input',function(event) {
			var temp = url + "&keyword="+encodeURIComponent(encodeURIComponent($(this).val()));
			$(this).keyup(function(e){
				if(e.keyCode === 8){
					that.index = -1;
				}
			});

			lastTime = event.timeStamp;  //标记上次触发时间
			setTimeout(function(){
				if(lastTime-event.timeStamp===0) {
		            $.ajax({
						type:"GET",               
						url:temp,   
						contentType: "application/json; charset=utf-8",
						dataType: "json",
						cache:false,
						success:function(data){
							if (data.ret) {
								if(data.wordlist.length>0){
									that.rec_rander(data.wordlist);
									$(".rec_box").addClass('zindex99').removeClass('zindex0');	
									$(".rec_search").show();
									that.rec_hover();
									that.rec_click();	
								}else{
									$(".rec_search").hide();
								}					
							}else{
								$(".rec_search").hide();
							}
						},
						error:function(msg) {
						}
					});
				}
			},200);
		});
	},
	rec_rander:function(data){		
		var htmlstr = [];
		for (var i = 0; i < data.length; i++) {
			htmlstr.push('<li>'+data[i]+'</li>');
		}
		$(".rec_search ul").html(htmlstr.join(''));	
	},
	hotRander:function(data){
		var htmlstr = [];
			for (var i = 0; i < data.length; i++) {
				htmlstr.push('<span><a href="/item/list.html#category=0&keyword='+data[i]+'&page=1&order=date">'+data[i]+'</a></span>');
			};
			return htmlstr.join('');
	},
	getHotwords:function(url){
		var that = this;
		$.ajax({
			type:"GET",               //商品列表请求
			url:url,     //"hotkey.do"
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			cache:false,
			success:function(data){
				if (data.ret) {
					$(".hotsearch").html(that.hotRander(data.hotkey));
					that.hortkLink();
				}else{
					$(".hotsearch").html(that.hotRander(""));
				}
			},
			error:function(msg) {
				console.log('fail'+msg);
			}
		});
	},
	hortkLink:function(paramobj){
		$(".hotsearch a").bind('click', function(event) {
			var keyword = $(this).html();
			$("#s_text").val(keyword);
			$("#s_btn").trigger('click.btn');
		});
	},
	keyEvent: function(){	
		var that = this;	
		paramobj = Param.getParam();
		$("#s_text").keydown(function(e) {
			if (e.keyCode === 38 || e.keyCode === 40) {	
				return false;
			}
		});
		$("#s_text").keyup(function(e){
			var li_show = $(".rec_search");
			var li;
			var len = $(".rec_search li").length;

			if(e.keyCode === 38){					
				that.index--;
				if(that.index < 0){
					that.index = len-1;
				}
				li = li_show.find("li:eq(" + that.index + ")");	
				$(this).val(li.html());		
				paramobj["keyword"] = li.html();
				window.location.hash = Param.setParam(paramobj);					
				li.addClass("hover").siblings().removeClass("hover");
			}			
			if(e.keyCode === 40){			
				that.index++;

				if(that.index > len-1){
					that.index = 0;
				}
				li = li_show.find("li:eq(" + that.index + ")");	
				$(this).val(li.html());	
				paramobj["keyword"] = li.html();
				window.location.hash = Param.setParam(paramobj);						
				li.addClass("hover").siblings().removeClass("hover");
			}
			if(e.keyCode === 13){
				$(".rec_search").hide();
				$(".rec_box").addClass('zindex0').removeClass('zindex99');
				$("#s_btn").trigger('click.btn');
				
			}
		});
	}

}
