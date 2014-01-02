var login = require("../common/islogin.js");
require("../common/validate.js");
$(function(){
	login.Login('../../isLogin.do');
	$(".file-box").delegate("input[name='picture']",'change.add',function(e){
		if ($(this).val()) {
			$(this).parent().find('.txt').val($(this).val());
		};

	});

	$("#addPic").bind('click', function(event) {
		var htmlstr = ['<div class="picture"> ',
							'<input type="text" class="txt" /> ',
							'<input type="button" class="btn" value="浏览..." /> ',
							'<input type="file" name="picture" class="file" class="s_picture" size="28" />',
							'<input type="button" class="btn del" value="删除"/>',
							'<span class="errmsg"></span>',
						'</div>'
						].join('');

		$(".file-box").append($(htmlstr));
	   	$(".del:last").click(function(){
	        $(this).parent().remove();
	    });
	});

	$(".qb_class").bind("click",function(e){
		$(".subject:eq(0)").addClass('hidden');
		$(".subject:eq(1)").removeClass('hidden');
		console.log("category = " + $(this).attr("name"));
		$(".class_category").val($(this).attr("name"));
	});
	//表单验证
   
})