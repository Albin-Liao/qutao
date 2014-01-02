module.exports =(function(){
	function OthermsgUI(){

	}
	OthermsgUI.prototype.rander = function(data) {
		var htmlstr = ['<tr id="table_title">',
						'<td class="firstd" width="50%">标题</td>',
						'<td width="10%">类别</td>',
						'<td width="10%">状态</td>',
						'<td align="center">发布时间</td>',
						'</tr>'
						];
		for (var i = 0; i < data.length; i++) {
			htmlstr.push('	<tr class="table_msg_list table_msg_border">');
			htmlstr.push('		<td class="firstd"><a href="../item/detail.html?productId='+data[i].productId+'" class="my_msg_title">');
			htmlstr.push(data[i].title);
			htmlstr.push('			</a></td>');
			htmlstr.push('		<td>');
			htmlstr.push(data[i].categoryName);
			htmlstr.push('		</td>');
			htmlstr.push('		<td>');
			htmlstr.push(data[i].statusValue);
			htmlstr.push('		</td>');
			htmlstr.push('		<td align="center">');
			htmlstr.push(data[i].date);
			htmlstr.push('		</td>');
			htmlstr.push('	</tr>');
		}

			return htmlstr.join('');
	};
	OthermsgUI.prototype.randerUser = function(rtx,data){
		var userName = data.username ||'';
		var phone = data.phone ||'';
		var qq = data.qq ||'';
		var htmlstr = [];
			htmlstr.push('<legend>用户信息</legend>');
			htmlstr.push('<span class="ml rtxAccount">RTX账号 : <b>'+rtx+'</b></span>');
			htmlstr.push('<span class=" ml userName">用户名 : <b>'+userName+'</b></span>');
			htmlstr.push('<span class="ml phone">电话 : <b>'+phone+'</b></span>');
			htmlstr.push('<span class=" ml qq">QQ : <b>'+qq+'</b></span>');
		return htmlstr.join('');
	}
	return {
		Othermsg:OthermsgUI
	}
})()