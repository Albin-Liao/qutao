module.exports = (function(){
	function picUI(){

	}
	picUI.prototype.rander = function(data){
		var htmlstr = [];
			htmlstr.push('	<div class="pre_pic fl">');
			htmlstr.push('		<img src="http://sources.corp.qunar.com/qutao/item/u46_normal.jpg" alt="">');
			htmlstr.push('	</div>');
			htmlstr.push('	<div class="main_pic fl">');
			htmlstr.push('		<ul>');
			for (var i = 0; i < data.length; i++) {
				htmlstr.push('		<li>	');
				htmlstr.push('			<img src="../'+data[i].path+'" alt="" width="100" height="80" >');
				htmlstr.push('		</li>');
			};
			htmlstr.push('		</ul>');
			htmlstr.push('	</div>');
			htmlstr.push('	<div class="next_pic fl">');
			htmlstr.push('		<img src="http://sources.corp.qunar.com/qutao/item/u48_normal.jpg" alt="">');
			htmlstr.push('	</div>');
			return htmlstr.join('');
	}
	picUI.prototype.pic_click = function(){
		$(".main_pic").find('img').bind('click', function(event) {

			$("#detailMsg_img").find('img')[0].src = this.src;
		});
	}
	var margin = -40;
	picUI.prototype.pre_click = function(){
		$(".pre_pic").bind('click', function(event) {

			if (margin<-40) {
				$(".main_pic ul").animate({marginLeft:"+=110px"},500);
					margin += 110;
			}else{
				margin = -40;
			}
			
		});
	}
	picUI.prototype.next_click = function(len){
		$(".next_pic").bind('click', function(event) {
			var change = (-110)*len;
			if (margin>change){
				$(".main_pic ul").animate({marginLeft:"-=110px"},500);
					margin -= 110;		
			}
			else if(margin+40===change){
				$(".main_pic ul").animate({marginLeft:"-="+change+"px"},300);
				margin = -40;
			}
			
		});		
	};
	return {
		PicUI:picUI
	}
})()