module.exports = (function(){
 	var result = $("#sel_wrap").find("span");
 	var x;
 	$("#c_select").bind("change.style",function()
 	{
 		var opt = $(this).find("option");
 		for (var i = 0; i < opt.length; i++) 
 		{
 			if (opt[i].selected == true) 
 			{
				x = opt[i].innerHTML;
			}
 		};
 		result.html(x);
 	});
 	function _init(category)
 	{
 		var opt = $("#c_select").find("option");
  		for (var i = 0; i < opt.length; i++) 
  		{
 			if (opt[i].value == category) 
 			{
				x = opt[i].innerHTML;
			}	
 		}
 		$("#c_select").val(category);
 		result.html(x);	
 	}
	return {
		init : _init
	}
 })();
 