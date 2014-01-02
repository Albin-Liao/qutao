var login = require("../common/islogin.js");
var selectUI = require("../common/top_select.js");
var UImodule = require("module/listInfo.js");
var searchlist = require("../common/searchlist.js");

var paramInit = require("module/initParam.js");
$(function() {
	login.Login('../isLogin.do');
	searchlist.getHotwords('hotkey.do');
	searchlist.keyEvent();
	var Category = ['全部', '合租', '数码', '书籍', '其他'];
	var Param = new paramInit.ParamInit();
	var paramobj;
	var outerflag = false;

	var list = new UImodule.listUI();

	var hot = function(data) {
		if (data.ret) {
			var htmlstr = list.hotListRander(data.list);
			$(".hot_list").html(htmlstr);
			var len = data.list.length - 5;
			if (len > 0) {
				list.next_click(len);
				list.pre_click();
			}
		} else {
			$(".hot_list").html("");
		}
	}
	var init = function() {
		var category;
		var key;
		if (!window.location.hash) {
			window.location.hash = '#category=0&keyword=&page=1&order=date';
		}
		paramobj = Param.getParam();
		category = paramobj["category"];
		key = paramobj["keyword"];
		searchlist.rec_focus('../search.do?category=' + category); //顶部搜索提示
		selectUI.init(category);
		$("#s_text").val(key);
		$(".classes").html('<a href="list.html#category=' + category + '&keyword="' + key + '&page=1&order=date>' + Category[category] + '</a>');

		//初始化
		var hot_url = "hotList.do?category="+category;
		list.getData(hot_url,hot);
	};

	init();

	var inner = function(data) {
		if (data.ret) {
			var htmlstr = list.rander(data.list);
			$(".msgList_subject").html(htmlstr);
		}/* else {
			debugger
			$(".msgList_subject").html('<div class="emptymsg"><p align="center">很抱歉,没有找到与 '+$("#s_text").val()+' 相关的信息<br/>建议您：</p><p>去掉不必要的字句，扩大搜索范围。</p></div>');
			$("#Pagination").html("");
		}*/

	};
	var outer = function(data) {
		console.log(data.ret);
		if (data.ret) {
			if (!outerflag) {
				var tpage = Math.floor((data.hit+19)/20);
					tpage = tpage<10?tpage:10;
				var opt = getOptionsFromForm();
				$("#Pagination").pagination(tpage, opt); //初始化分页插件
				outerflag = true;				
			};
			var htmlstr = list.outerRander(data.list,data.hit);
			$(".msgList_other table").html(htmlstr);
			//$(".msgList_msg_pager").append($("<div class='resultNum'>趣淘为你找到"+data.hit+"</div>"))
		}else{
			$(".msgList_other table").html('<h5 align="center">'+data.msg+'</h5>');
			$("#Pagination").html("");
		}
	}
	var FormatParam = function(obj) {
		var param = "category=" + obj["category"] + //请求总页数
		"&keyword=" + encodeURIComponent(encodeURIComponent(obj["keyword"]));
		return param;
	}
	//分页插件调用
	function getOptionsFromForm() {
		var opt = {
			callback: pageselectCallback
		};
		opt["items_per_page"] = 5; //可配置，需要可从html中获取
		opt["num_display_entries"] = 8;
		opt["num_edge_entries"] = 2;
		opt["prev_text"] = "上一页";
		opt["next_text"] = "下一页";

		var htmlspecialchars = {
			"&": "&amp;",
			"<": "&lt;",
			">": "&gt;",
			'"': "&quot;"
		}
		$.each(htmlspecialchars, function(k, v) {
			opt.prev_text = opt.prev_text.replace(k, v);
			opt.next_text = opt.next_text.replace(k, v);
		})
		return opt;
	}

	function pageselectCallback(page_index, jq) { //分页回调函数
		var items_per_page = 15; //每页条数
		paramobj = Param.getParam();
		var keyword = paramobj["keyword"];
		var temp = FormatParam(paramobj);
		console.log(temp);
		var order = paramobj["order"];
		if ($(".msgList_subject").css('display')=='block') {
			//本站请求
			list.getData("searchList.do?" + temp + "&page=" + (page_index + 1) + "&order=" + order, inner);
		}else{ //外站请求
			list.getData("../tps/s.do?key="+keyword+"&page=" + (page_index+1), outer);
		}
		return false;
	}

	function getTotalPage(status) {
		$.ajax({
			type: "GET",
			url: "totalpage.do?" + status,
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			cache:false,
			success: function(data) {
				if (data>0) {
					var opt = getOptionsFromForm();
					$("#Pagination").pagination(data, opt); //初始化分页插件	
				}else{
					var keyword = $("#s_text").val();
					$(".msgList_subject").html('<div class="emptymsg"><p>很抱歉,没有找到与 '+keyword+' 相关的信息<br/>建议您：</p><p>(1)去掉不必要的字句，扩大搜索范围。<br/>(2)马上发布一条与“<font>'+keyword+'</font>”相关的信息。马上<a href="../personal/operate/add.html"><span>发布一条>></span></a></p></div>');
				}
			},
			error: function(msg) {}
		});
	}
	getTotalPage(FormatParam(paramobj)); //获取总页数，
	EventContorl = {
		orderby: function() {
			$(".list_order").find('span').bind('click.order', function(event) {
				$(".list_order").find('.normal').addClass('active').removeClass('normal');
				$(this).removeClass('active').addClass('normal');
				var order = $(this).attr('name');
				paramobj["order"] = order;
				window.location.hash = Param.setParam(paramobj);
				var temp = FormatParam(paramobj);
				list.getData("searchList.do?" + temp + "&page=" + paramobj["page"] + "&order=" + order, inner);
			});
		},
		classify: function() {
			$("#c_select").bind('change.req', function(event) {
				var category = $("#c_select").val();
				paramobj["category"] = category;
				window.location.hash = Param.setParam(paramobj);
				getTotalPage(FormatParam(paramobj));
				$(".classes").html('<a href="list.html' + Param.setParam(paramobj) + '">' + Category[category] + '</a>');
				var hot_url = "hotList.do?category=" + category;
				list.getData(hot_url, hot);
			})
		},
		searchbtn: function() {
			$("#s_btn").bind('click.btn', function(event) {
				var keyword = $("#s_text").val();
				paramobj["keyword"] = keyword;
				window.location.hash = Param.setParam(paramobj);
				if ($(".msgList_subject").css('display')=='block') {
					//本站请求
					getTotalPage(FormatParam(paramobj));
				}else{ //外站请求
					outerflag = false;
					list.getData("../tps/s.do?key="+keyword+"&page=1", outer);
				}
			});

		},
		tabClick: function() {
			$(".list_tab_bar").find("li").bind('click', function(event) {
				$(this).siblings().removeClass('active');
				$(this).addClass('active');
				if ($(this).index(".list_tab_bar li") == 0) {
					//本站
					outerflag = false;
					getTotalPage(FormatParam(paramobj));
					$(".msgList_other").hide();
					$(".hot_list").show();
					$(".list_order").show();
					$(".msgList_subject").show();

				} else {
					//外站
					var keyword = $("#s_text").val();
					//getTotalPage(FormatParam(paramobj("key"));
					list.getData("../tps/s.do?key="+keyword+"&page=1", outer);
					$(".hot_list").hide();
					$(".msgList_subject").hide();
					$(".list_order").hide();
					$(".msgList_other").show();
				}
			});
		},
		init: function() {
			this.orderby();
			this.classify();
			this.searchbtn();
			this.tabClick();
		}
	}
	EventContorl.init();


});