module.exports = (function(){
	/******UI列表**********/
	function ListUI(){    //商品列表
		
	} 

	ListUI.prototype.hotListRander = function(data){
		var htmlstr = [];
		htmlstr.push('<div class="recommend">');
		htmlstr.push('	<div class="r_description">');
		htmlstr.push('		<div class="r_title">');
		htmlstr.push('			<span>热门推荐</span>');
		htmlstr.push('		</div>');
		htmlstr.push('	<div class="r_detail">');
		htmlstr.push('		<span>最新热门推荐商品，不要错过哦~</span>');
		htmlstr.push('	</div>');
		htmlstr.push('</div>');
		htmlstr.push('<div class="r_list">');
		htmlstr.push('	<div class="pre_pic">');
		htmlstr.push('		<img src="http://sources.corp.qunar.com/qutao/item/u46_normal.jpg" alt="">');
		htmlstr.push('	</div>');
		htmlstr.push('	<div class="main_list">');
		htmlstr.push('		<ul>');
		for(var i = 0; i < data.length; i++){
			htmlstr.push('<li>');
			htmlstr.push('	<div class="list_item">');
			htmlstr.push('		<div class="list_item_img">');
			htmlstr.push('			<a href="');
			htmlstr.push('detail.html?productId='+data[i].productId);
			htmlstr.push('			">');
			htmlstr.push('				<img title="'+data[i].title+'" src="../'+data[i].path+'" alt=""></a>');
			htmlstr.push('		</div>');
			htmlstr.push('		<p class="list_item_price">￥'+data[i].price+'</p>');
			htmlstr.push('	</div>');
			htmlstr.push('</li>');
		}
		htmlstr.push('		</ul>');
		htmlstr.push('	</div>');
		htmlstr.push('	<div class="next_pic">');
		htmlstr.push('		<img src="http://sources.corp.qunar.com/qutao/item/u48_normal.jpg" alt="">');
		htmlstr.push('	</div>');
		htmlstr.push('</div>');
		return htmlstr.join('');
	};
	ListUI.prototype.rander = function(data) {
		var htmlstr = [];
		for (var i = 0; i < data.length; i++) {
			htmlstr.push('	<div class="msgList_item">');
			htmlstr.push('		<div class="msgList_item_img">');
			htmlstr.push('				<a href="');
			htmlstr.push('detail.html?productId='+data[i].productId);
			htmlstr.push('			">');
			htmlstr.push('			<img src="');
			htmlstr.push('../'+data[i].path);
			htmlstr.push('		" width="162px" height="170px" />');
			htmlstr.push('			</a>');
			htmlstr.push('		</div>');
			htmlstr.push('		<div class="msgList_item_text">');
			htmlstr.push('			<div class="msgList_item_title">');
			htmlstr.push('				<a href="');
			htmlstr.push('detail.html?productId='+data[i].productId);
			htmlstr.push('			">');
			htmlstr.push(data[i].title);
			htmlstr.push('			</a>');
			htmlstr.push('			</div>');
			htmlstr.push('			<div class="msgList_item_detail">');
			htmlstr.push('				<div class="msgList_item_price">￥<span>');
			htmlstr.push(data[i].price);
			htmlstr.push('				</span></div>');
			htmlstr.push('			</div>');
			htmlstr.push('				<div class="msgList_item_author">');
			htmlstr.push(data[i].rtxAccount);
			htmlstr.push('				</div>');
			htmlstr.push('			</div>');
			htmlstr.push('			<div class="msgList_item_time clearfix">');
			htmlstr.push('				<p>点击次数:<span>'+data[i].click+'</span>次</p>');
			htmlstr.push('			</div>');
			htmlstr.push('		</div>');
			htmlstr.push('	</div>');
		};
		htmlstr.push('<div class="clearfix"></div>');
		return htmlstr.join('');
	};
	ListUI.prototype.outerRander = function(data,num){
		var htmlstr = ['<tr class="resultr"><td colspan="5">','<div class="resultnum">趣淘为您找到相关结果约',num,'个<div>','</td></tr>'];
		for (var i = 0; i < data.length; i++) {
			htmlstr.push('	<tr>');
			htmlstr.push('		<td align="center" width="18%">');
			htmlstr.push('			<img src="'+data[i].pic+'" alt="">');
			htmlstr.push('		</td>');
			htmlstr.push('		<td class="td_title">');
			htmlstr.push('			<a class="msgList_detail_title" target="_blank" href="detail2.html?id='+data[i].id+'">');
			if(data[i].chengse!=="-"){
				htmlstr.push('<span>['+data[i].chengse+']</span>');
			}			
			htmlstr.push(data[i].title);
			htmlstr.push('			</a>');
			htmlstr.push('			<p class="msgList_detail_text">');
			htmlstr.push(data[i].description);
			htmlstr.push('			</p>');
			htmlstr.push('		</td>');
			htmlstr.push('		<td class="msgList_detail_text" align="center">');
			htmlstr.push(data[i].area);
			htmlstr.push('		</td>');
			htmlstr.push('		<td class="msgList_detail_text"><span>');
			htmlstr.push(data[i].price);
			htmlstr.push('		</span></td>');
			htmlstr.push('		<td class="msgList_detail_text">');
			htmlstr.push(data[i].time);
			htmlstr.push('		</td>');
			htmlstr.push('	</tr>');
		};
		return htmlstr.join('');
	}
	ListUI.prototype.getData = function(url,callback){
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
	var margin = 0;
	ListUI.prototype.pre_click = function(){
		$(".pre_pic").bind('click', function(event) {				
			if (margin<0) {
				$(".main_list ul").animate({marginLeft:"+=126px"},500);
				margin += 126;
			}else{
				margin = 0;
			}
		});
	}
	ListUI.prototype.next_click = function(len){
		$(".next_pic").bind('click', function(event) {
			var change = (-126)*len;									
			if (margin>change){
				$(".main_list ul").animate({marginLeft:"-=126px"},500);		
				margin -= 126;	
			}
			else if(margin===change){
				$(".main_list ul").animate({marginLeft:"-="+change+"px"},300);
				margin = 0;
			}
			console.log(new_ml+"::"+change);
		});		
	}
	return {
		listUI:ListUI,
	}
})()
