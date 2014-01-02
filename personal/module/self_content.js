module.exports =(function(){
	function SelfmsgUI(){

	}
	SelfmsgUI.prototype.rander = function(data) {
		var htmlstr = ['<tr id="table_title">',
						'<td align="center">',
						'<input type="checkbox" id="allselect"></td>',
						'<td>标题</td>',
						'<td>类别</td>',
						'<td>状态</td>',
						'<td>发布时间</td>',
						'<td>操作</td>',
						'</tr>'
						];
		for (var i = 0; i < data.length; i++) {
			htmlstr.push('	<tr class="table_msg_list table_msg_border">');
			htmlstr.push('		<td align="center">');  //:enabled
			if (data[i].status===2) {
				htmlstr.push('			<input type="checkbox" name="product_id" disabled value="'+data[i].productId+'" /></td>');
			}else{
				htmlstr.push('			<input type="checkbox" name="product_id" value="'+data[i].productId+'" /></td>');
			}
			
			htmlstr.push('		<td><a href="../item/detail.html?productId='+data[i].productId+'" class="my_msg_title">');
			htmlstr.push(data[i].title);
			htmlstr.push('			</a></td>');
			htmlstr.push('		<td>');
			htmlstr.push(data[i].categoryName);
			htmlstr.push('		</td>');
			htmlstr.push('		<td>');
			htmlstr.push(data[i].statusValue);
			htmlstr.push('		</td>');
			htmlstr.push('		<td>');
			htmlstr.push(data[i].date);
			htmlstr.push('		</td>');
			htmlstr.push('		<td>');
			if (data[i].status!==2)
			{
				htmlstr.push('			<a href="operate/update.html?productId='+data[i].productId+'" class="my_msg_operate">修改</a>');
				htmlstr.push('			<a href="#" name="'+data[i].productId+'" class="my_msg_operate del">删除</a>');
			}
			htmlstr.push('		</td>');
			htmlstr.push('	</tr>');
		}

			return htmlstr.join('');
	};
	return {
		Selfmsg:SelfmsgUI
	}
})()