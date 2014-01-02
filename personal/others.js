var login = require("../common/islogin.js");
var selectUI = require("../common/top_select.js");
var otherUI = require("module/others_content.js");
var searchlist = require("../common/searchlist.js");

$(function(){
	login.Login('../isLogin.do');
	searchlist.getHotwords('../item/hotkey.do');
	searchlist.keyEvent();
	var category = $("#c_select").val();
	searchlist.rec_focus('../search.do?category='+category);   //顶部搜索提示

	var url = window.location.search;
	var rtxAccount = url.substring(url.indexOf('=')+1);
	var other = new otherUI.Othermsg();

	var othermsg = function(data){
		if(data.productDetails.length>0){
			$('.userMsg').html(other.randerUser(rtxAccount,data.productDetails[0]));
			$("#my_msg_table table").html(other.rander(data.productDetails));			
		}else{
			$("#my_msg_table table").html('<h5 align="center">该用户没有发布其他商品</h5>');
			$("#Pagination").html("");	
		}

	}

	var getData = function(url,callback){
		$.ajax({
			type:"GET",              
			url:url,   
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			cache:false,
			success:callback,
			error:function(msg) {
				console.log('fail'+msg);
			}
		});
	}	

	function getOptionsFromForm(){
        var opt = {callback: pageselectCallback};
            opt["items_per_page"] = 15;    //可配置，需要可从html中获取
            opt["num_display_entries"] = 8;
            opt["num_edge_entries"] = 2;
            opt["prev_text"] = "上一页";
            opt["next_text"] = "下一页";

        var htmlspecialchars ={ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;"}
        $.each(htmlspecialchars, function(k,v){
            opt.prev_text = opt.prev_text.replace(k,v);
            opt.next_text = opt.next_text.replace(k,v);
        })
        return opt;
    }
	function pageselectCallback(page_index, jq){   //分页回调函数
        var items_per_page = 15;     //每页条数
        var status = $("#my_classify li.selected").attr("name");
        getData('otherlist.do?rtxAccount='+rtxAccount+'&status='+status+'&page='+(page_index+1),othermsg);
        return false;
    }

	var getTotalPage = function(status){
		$.ajax({
		type:"GET",       
		url:"othertotalpage.do?status="+status+"&rtxAccount="+rtxAccount,  
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		cache:false,
		success:function(data){
			if (data>0) {
				var opt = getOptionsFromForm();
				$("#Pagination").pagination(data, opt);//初始化分页插件	
			}else{
				$("#Pagination").html("");
				$("#my_msg_table table").html("该用户没有发布其他商品");
			}		
		},
		error:function(msg) {
		}
	});	
	}
	var init = function(){
			var status = $("#my_classify li.selected").attr("name");
			getTotalPage(status);
	}

	init();

	var EventContorl = {
		tabevent:function(){
			$("#my_classify li").bind('click', function(event) {
			var status = $(this).attr("name");
			$('.selected').removeClass('selected');
			$(this).addClass('selected');
			console.log(status);
			getTotalPage(status);
			//param.status = status;
			});
		}
	}
	EventContorl.tabevent();
});

