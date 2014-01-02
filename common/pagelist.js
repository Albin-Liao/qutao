module.exports =(function(){
	function Pagelist(nowpage,allpage){
		this.allpage = allpage;
		this.nowpage = nowpage || 1;
		this.cenpage = 3;
	};
	Pagelist.prototype.getData = function(nowpage){
		var order = $(".list_order").find('.normal').attr('name') || 'date';
		var category = $("#c_select").val() || 0 ;
		var keyword = $("#s_text").val() || '' ;
		//debugger
		console.log($(".list_order"));
		$(".list_order").trigger('refreshData',[category,keyword,order,nowpage]);

	}
	Pagelist.prototype.rander = function(nowpage,allpage) {
		var pagestr = [];
		pagestr.push('	<div class=" fl qwd-page-scoll-normal qwd-page-first">首页</div>');
		pagestr.push('	<div class=" fl qwd-page-scoll-normal qwd-pre-sign">');
		pagestr.push('		<img src="http://sources.corp.qunar.com/qutao/common/dis-pre-page.gif" width="10" height="12">');
		pagestr.push('	</div>');
		pagestr.push('	<div class="qwd-page-all">');
		pagestr.push('<ul>');
		for (var i = 0; i < allpage; i++) {
			pagestr.push('<li class="qwd-page-scoll-normal qwd-page-sign">'+(i+1)+'</li>');
			this.nowmax = allpage;
		};
		pagestr.push('</ul>');
		pagestr.push('	</div>');	
		pagestr.push('	<div class=" fl qwd-page-scoll-normal qwd-next-sign">');
		pagestr.push('		<img src="http://sources.corp.qunar.com/qutao/common/next-page.gif" width="10" height="12">');
		pagestr.push('	</div>');
		pagestr.push('<div class=" fl qwd-page-scoll-normal qwd-page-last">末页</div>');
		$(".qwd-page-scoll").html(pagestr.join(''));
		$(".qwd-page-sign:eq(0)").removeClass('qwd-page-scoll-normal').addClass('qwd-page-scoll-active');

	};
	Pagelist.prototype.changeStyle = function(obj) {
		$(".qwd-page-scoll-active").removeClass('qwd-page-scoll-active').addClass('qwd-page-scoll-normal');
				$(obj).removeClass('qwd-page-scoll-normal').addClass('qwd-page-scoll-active');
	};
	Pagelist.prototype.pageclick = function(){
		var that = this;
		$(".qwd-page-sign").bind('click', function(event) {
			var thepage = $(this).html();
			that.getData(thepage);   //请求当前页数据
			var move = thepage - that.cenpage ;
			that.nowpage = thepage;
			that.changeStyle(this);
			var $ul = $(".qwd-page-all ul");
			if (that.nowpage <3 ) {
				//首边界
				$ul.css("margin-left",'0px');	
				that.cenpage = 3;		
			}else if(that.nowpage >that.allpage-2){
				//尾边界
				var ml = -(that.allpage-5)*32;
				////console.log(ml);
				$ul.css("margin-left",ml+'px');
				that.cenpage = that.allpage-2;
			}else{
				that.cenpage =  that.nowpage;
				switch(move){
					case -2 : $ul.animate({marginLeft:"+=64px"},500);break;
					case -1 : $ul.animate({marginLeft:"+=32px"},500);break;
					case  0 : ;break;
					case  1 : $ul.animate({marginLeft:"-=32px"},500);break;
					case  2 : $ul.animate({marginLeft:"-=64px"},500);break;
				}
			}
		});
	};
	Pagelist.prototype.prepage = function(nowpage) {
		var that = this;
		$(".qwd-pre-sign").bind('click', function(event) {
			if (that.nowpage > 1) {
				that.nowpage--;
				$(".qwd-next-sign").find('img')[0].src = 'http://sources.corp.qunar.com/qutao/common/next-page.gif';
				$(".qwd-page-scoll-active").removeClass('qwd-page-scoll-active').addClass('qwd-page-scoll-normal')
					.prev().removeClass('qwd-page-scoll-normal')
						.addClass('qwd-page-scoll-active');
				if (that.nowpage>=3&&(that.nowpage<that.allpage-2)) {
					that.cenpage --; 
					var $ul = $(".qwd-page-all ul");
					$ul.animate({marginLeft:"+=32px"},200);	
				};
			}else{
				$(".qwd-pre-sign").find('img')[0].src = 'http://sources.corp.qunar.com/qutao/common/dis-pre-page.gif';
			}
		});	
	};
	Pagelist.prototype.nextpage = function(nowpage,len) {
		var that = this;
		$(".qwd-next-sign").bind('click', function(event) {
			if (that.nowpage < that.allpage) {
				that.nowpage++;
				$(".qwd-pre-sign").find('img')[0].src = 'http://sources.corp.qunar.com/qutao/common/pre-page.gif';
				$(".qwd-page-scoll-active").removeClass('qwd-page-scoll-active').addClass('qwd-page-scoll-normal')
					.next().removeClass('qwd-page-scoll-normal')
						.addClass('qwd-page-scoll-active');
				if (that.nowpage>3&&(that.nowpage<=that.allpage-2)) {
					that.cenpage ++; 
					var $ul = $(".qwd-page-all ul");
					$ul.animate({marginLeft:"-=32px"},200);	
				};
			}else{
				$(".qwd-next-sign").find('img')[0].src = 'http://sources.corp.qunar.com/qutao/common/dis-next-page.gif';
			}
		});	
	};
	Pagelist.prototype.firstpage = function() {
		var that = this;
		$(".qwd-page-first").bind('click', function(event) {
			that.changeStyle($('.qwd-page-sign')[0]);
			var $ul = $(".qwd-page-all ul");
			$ul.css("margin-left","0px");
			that.cenpage = 3;
			that.nowpage = 1;	
			$(".qwd-pre-sign").find('img')[0].src = 'http://sources.corp.qunar.com/qutao/common/dis-pre-page.gif';
			$(".qwd-next-sign").find('img')[0].src = 'http://sources.corp.qunar.com/qutao/common/next-page.gif';			
		});
	};
	Pagelist.prototype.lastpage = function() {
		var that = this;
		var ml ;  //= -(that.allpage-5)*32;
		if (that.allpage <=5) {
			ml = 0;
		}else{
			ml = -(that.allpage-5)*32;
		}
		$(".qwd-page-last").bind('click', function(event) {
			that.changeStyle($('.qwd-page-sign')[that.allpage-1]);
			var $ul = $(".qwd-page-all ul");
			$ul.css("margin-left",ml+"px");
			that.cenpage = that.allpage-2;
			that.nowpage = that.allpage;	
			$(".qwd-pre-sign").find('img')[0].src = 'http://sources.corp.qunar.com/qutao/common/pre-page.gif';
			$(".qwd-next-sign").find('img')[0].src = 'http://sources.corp.qunar.com/qutao/common/dis-next-page.gif';		
		});
	};
	Pagelist.prototype.setValue = function(){}
	Pagelist.prototype.init = function(nowpage,allpage) {
		this.nowpage = nowpage;
		this.allpage = allpage;
		this.rander(nowpage,allpage);
		if (allpage <= 5) {   //总页数小于5时
			var w = 32*allpage;
			$(".qwd-page-scoll").find('.qwd-page-all').css("width",w+"px");
		};
		this.pageclick();
		this.prepage();
		this.nextpage();
		this.firstpage();
		this.lastpage();
	};
	return {
		PageList:Pagelist
	}
})()