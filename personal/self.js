var login = require("../common/islogin.js");
var selectUI = require("../common/top_select.js");
var selfUI = require("module/self_content.js");
var searchlist = require("../common/searchlist.js");
$(function(){
	login.Login('../isLogin.do');
	searchlist.getHotwords('../item/hotkey.do');
	searchlist.keyEvent();
	var category = $("#c_select").val();
	searchlist.rec_focus('../search.do?category='+category);   //顶部搜索提示
  
    function getOptionsFromForm(){
        var opt = {callback: pageselectCallback};
            opt["items_per_page"] = 5;    //可配置，需要可从html中获取
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
        var items_per_page = 20;     //每页条数
        var status = $("#my_classify li.selected").attr("name");
        getData(status,page_index+1);
        // Prevent click event propagation
        return false;
    }

	var self = new selfUI.Selfmsg();
	var param = {    //删除时传给后台参数
			param:-1,
			productIds:[]
		};
	var getData = function(status,nowpage){
		$.ajax({
			type:"GET",       
			url:"info.do?status="+status+"&page="+nowpage,  
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			cache:false,
			success:function(data){
				if (data.ret===true) {
					$("#my_msg_table table").html(self.rander(data.productDetails));
					//page.init(1,data.totalPageNum);	
					EventContorl.selectAll();
					EventContorl.changeColor();
					EventContorl.delone();					
				}else{
					$("#Pagination").html("");
					$("#my_msg_table table").html("<h5 align='center'>暂无该类信息</h5>");
				}

			},
			error:function(msg) {
			}
		});
	}
	var postData = function(param){
		$.ajax({
			type:"POST",               //商品列表请求
			url:"delete.do",
			data:JSON.stringify(param),
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			cache:false,
			success:function(data){
				console.log(data);
				$("#my_msg_table table").html(self.rander(data.productDetails));
				EventContorl.selectAll();
				EventContorl.changeColor();
				EventContorl.delone();
			},
			error:function(msg) {
			}
		});		
	}
	var getTotalPage = function(status){
		$.ajax({
		type:"GET",       
		url:"owntotalpage.do?status="+status,  
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		cache:false,
		success:function(data){
			if (data > 0) {
				var opt = getOptionsFromForm();
				$("#Pagination").pagination(data, opt);//初始化分页插件	
			}			
		},
		error:function(msg) {
		}
	});	
	}
	var EventContorl = {
		tabevent:function(){
			$("#my_classify li").bind('click', function(event) {
			var status = $(this).attr("name");
			$('.selected').removeClass('selected');
			$(this).addClass('selected');
			getTotalPage(status);
			param.status = status;
			});
		},
		selectAll:function(){
			$("#allselect").bind('click', function(event) {
				var checked = $(this).attr("checked") ;
				if (checked) {
					$("input[name='product_id']:enabled").attr("checked",checked);
				}else{
					$("input[name='product_id']:enabled").attr("checked",false);
				}
				
			});
		},
		deleteAll:function(){
			$(".my_operate_all:last").bind('click', function(event) {
				param.productIds = [];
				$("input[name='product_id']:checked").each(function() {
					param.productIds.push($(this).val());
				});
				postData(param);
			});

		},
		delone:function(){
			$(".del").bind('click', function(event) {
				param.productIds = [];
				param.productIds.push($(this).attr("name"));
				postData(param);
				event.preventDefault();
			});
		},
		changeColor:function(){
			$(".table_msg_list").hover(function() {
				$(this).css("background-color","#f8f8f8");
			}, function() {
				$(this).css("background-color","#ffffff");
			});
		},
		pageEvent:function(){
			$(".list_order").bind('refreshData', function(event,category,keyword,order,nowpage) {				
				var status = $("#my_classify .selected").attr("name");
				getData(status,nowpage);
			});
		}
	};
	getTotalPage(-1);
	EventContorl.tabevent();
	EventContorl.deleteAll();
	//EventContorl.pageEvent();
	

});

