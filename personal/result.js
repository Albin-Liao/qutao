$(function() {
	var url = window.location.search;
	var state = url.substring(url.indexOf('=') + 1);
	switch (state) {
		case '1':
			addSucc();
			break;
		case '2':
			addFail();
			break;
		case '3':
			updateSucc();
			break;
		case '4':
			updateFail();
			break;
		default:
			error();
	}

	function addSucc() {
		var aa = $(".subject", parent.document);
		$(aa[1]).addClass('hidden');
		$(aa[2]).removeClass('hidden');
		setTimeout("parent.location.href='../self.html'", 2000);
	}

	function addFail() {
		alert('发布失败,请确认信息无误后重新发布')
	}

	function updateSucc() {
		var update = $(".subject", parent.document);
		$(update[0]).addClass('hidden');
		$(update[1]).removeClass('hidden');
		setTimeout("parent.location.href='../self.html'", 2000);
	}

	function updateFail() {
		alert('修改失败,请确认信息无误后重新发布');
	}

	function error() {}
});