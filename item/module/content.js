module.exports = (function(){
	function detailUI(){

	};
	detailUI.prototype.rander = function(data){
		if (data.imgs.length>0) {
			var path = data.imgs[0].path || '';
		}
		var htmlstr = [];
			htmlstr.push('<div id="detailMsg_top">');
			htmlstr.push('	<span id="detailMsg_title">');
			htmlstr.push(data.item.title);
			htmlstr.push('	</span>');
			htmlstr.push('	<span class="publishtime">');
			htmlstr.push(data.item.date);
			htmlstr.push('	</span>');
			htmlstr.push('</div>');
			htmlstr.push('<div id="detailMsg_img">');
			htmlstr.push('	<img src="../'+path+'" alt="" width="330" height="215">');
			htmlstr.push('</div>');
			htmlstr.push('<div id="detailMsg_detail">');
			htmlstr.push('	<ul>');
			htmlstr.push('		<li>');
			htmlstr.push('			<div class="detail_title">简介:</div>');
			htmlstr.push('			<div class="detail_text">');
			htmlstr.push('				<span>&nbsp; '+data.item.productDetails+'</span>');
			htmlstr.push('			</div>');
			htmlstr.push('		</li>');
			htmlstr.push('		<li>');
			htmlstr.push('			<div class="detail_title">价格：</div>');
			htmlstr.push('			<div class="detail_text">');
			htmlstr.push('				<span>'+data.item.price+'</span>');
			htmlstr.push('				<span>元</span>');
			htmlstr.push('			</div>');
			htmlstr.push('		</li>');
			htmlstr.push('		<li>');
			htmlstr.push('			<div class="detail_title">联系人:</div>');
			htmlstr.push('			<div class="detail_text">');
			htmlstr.push('				<a id="detail_contact" href="../personal/others.html?rtxAccount='+data.item.rtxAccount+'">'+data.item.username+'</a>');
			htmlstr.push('			</div>');
			htmlstr.push('		</li>');
			htmlstr.push('		<li>');
			htmlstr.push('			<div class="detail_title">RTX：</div>');
			htmlstr.push('			<div class="detail_text">');
			htmlstr.push('				<span>'+data.item.rtxAccount+'</span>');
			//htmlstr.push('				<a id="detail_rtx" href="">给我留言</a>');
			htmlstr.push('			</div>');
			htmlstr.push('		</li>');
			htmlstr.push('		<li>');
			htmlstr.push('			<div class="detail_title">QQ：</div>');
			htmlstr.push('			<div class="detail_text">');
			htmlstr.push('&nbsp;');
			if (data.item.qq!=''&&data.item.qq!=null) {
			htmlstr.push('<a target="qqframe" href="tencent://message/?uin='+data.item.qq+'&Site=&Menu=yes">');	
			htmlstr.push('	<img src="http://wpa.qq.com/pa?p=1:'+data.item.qq+':10" border="0" align="middle" >');
			htmlstr.push('</a>');
			};
			htmlstr.push('			</div>');
			htmlstr.push('		</li>');
			htmlstr.push('		<li>');
			htmlstr.push('			<div class="detail_title">联系电话：</div>');
			htmlstr.push('			<div class="detail_text"><span class="phone">'+data.item.phone+'</span></div>');
			htmlstr.push('		</li>');
			htmlstr.push('	</ul>');
			htmlstr.push('</div>');
			htmlstr.push('<div class="clear"></div>');
			return htmlstr.join('');

	};
	detailUI.prototype.outerRander = function(data){
		var htmlstr = [];
			htmlstr.push('	<div class="detailMsg_title">');
			htmlstr.push(data.detial.title);
			htmlstr.push('		<span>'+data.detial.time+'</span>');
			htmlstr.push('	</div>');
			htmlstr.push('	<div class="detailMsg_main">');
			htmlstr.push('		<div class="detailMsg_img">');
			htmlstr.push('			<img src="');
			if(data.pics.length===1){
				htmlstr.push(data.pics[0]);
			}else{
				htmlstr.push(data.pics[1]);
			}		
			htmlstr.push('" border="0" width="0" height="0" alt="">');
			htmlstr.push('		</div>');
			htmlstr.push('		<div class="detailMsg_con">');
			htmlstr.push('			<ul>');
			htmlstr.push('				<li class="msg_price">价格 ：<span>'+data.detial.price+'</span></li>');
			htmlstr.push('			<li>成色 : '+data.detial.chengse+'</li>');		
			htmlstr.push('				<li>区域 : '+data.detial.area+'</li>');
			htmlstr.push('				<li class="msg_author">卖家 : <a href="'+data.detial.realUrl+'" target="_blank">点击跳转到58同城</a></li>');
			htmlstr.push('			</ul>');
			htmlstr.push('		</div>');
			htmlstr.push('		<div class="clear"></div>');
			htmlstr.push('		<div class="manubar">');
			htmlstr.push('			<div class="manuitem">');
			htmlstr.push('				物品详情');
			htmlstr.push('			</div>');
			htmlstr.push('		</div>');
			htmlstr.push('		<div class="discription">');
			htmlstr.push('			<p>'+data.detial.description+'</p>');
			htmlstr.push('			<p>联系我时，请说是在趣淘上看到的，谢谢！</p>');
			for(var i=0,len=data.pics.length;i<len;i++){
				htmlstr.push('<img src="'+data.pics[i]+'" />');
			}
			htmlstr.push('		</div>');
			htmlstr.push('	</div>')
			return htmlstr.join('');

	}
	detailUI.prototype.getData = function(url,callback) {
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
	};
	return {
		DetailUI:detailUI
	}
})()