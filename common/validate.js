(function(){

	var state = [false,false,false,false,false];

	$("#myForm").submit(function(){
		
		for(var i=0,len=state.length;i<len;i++){
			if(state[i]===true){
				alert("您填写的信息有误。");
				return false;
			}
		}
		var input = $(".errmsg").siblings();
		for(var i=0,len=input.length;i<len;i++){
			if(input[i].value===""){
				input[i].focus();
				return false;
			}
		}
	});

	// $(".file-box").delegate("input[name='picture']",'change',function(){
	// 	var that = $(".file");
	// 	var file = that.parent().find('.txt').val();
	// 	var fileName = file.substring(file.lastIndexOf("."));
	// 	reg = /(.JPEG|.jpeg|.JPG|.jpg|.GIF|.gif|.BMP|.bmp)$/;
	// 	if(!reg.test(fileName)){
	// 		that.siblings('span').html("图片格式不正确。");
	// 	}else{
	// 		that.siblings('span').html("");
	// 	}
	// });
 	$(".class_title").blur(function(){
 		var self = this.value;
 		var next = $(this).next();
 		reg = /[\u4e00-\u9fa5_a-zA-Z0-9_]{1,20}/;
 	   	if(!reg.test(self)){	   		
            $(this).next().html("请输入1-20字");
            state[0] = true;
	   	}else{
	        $(this).next().html("");
	   	}
 	});
 	$(".class_title").focus(function(){
 		state[0] = false;
 	});

 	$(".class_price").blur(function(){
 		var self = this.value;
 		var next = $(this).next().next();
 		reg = /^\d+$/;
 	   	if(!reg.test(self)){
            next.html("请输入非负数字。");
            state[1] = true;
	   	}else{
	        next.html("");
	   	}
 	});
 	$(".class_title").focus(function(){
 		state[1] = false;
 	});
 	$(".class_description").blur(function(){
 		var self = this.value;
 		var next = $(this).next();
 		reg = /[\u4e00-\u9fa5_a-zA-Z0-9_]{1,255}/;
 	   	if(!reg.test(self)){
            next.html("请输入1-255个字。");
            state[2] = true;
	   	}else{
	        next.html("");
	   	}
 	});
 	$(".class_description").focus(function(){
 		state[2] = false;
 	});
 	$(".class_qq").blur(function(){
 		var self = this.value;
 		var next = $(this).next();
 		reg = /^\s*[.0-9]{5,10}\s*$/
 	   	if(self!==""&&!reg.test(self)){
            next.html("请输入正确的QQ号。");
            state[3] = true;
	   	}else{
	        next.html("");
	   	}
 	});
 	$(".class_qq").focus(function(){
 		state[3] = false;
 	});
 	$(".class_phone").blur(function(){
 		var self = this.value;
 		var next = $(this).next();
 		reg = /((^((13[0-9])|(14[0-9])|(15[0-9])|(18[0-9]))\d{8}$)|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/;
 	   	if(!reg.test(self)){
            next.html("请输入正确的电话号码。");
            state[4] = true;
	   	}else{
	        next.html("");
	   	}
 	});
 	$(".class_phone").focus(function(){
 		state[4] = false;
 	});
})();
 	
