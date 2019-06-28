function web_finish(){
	window.android.webview_finish();
}

function need_id_check() {
	$('#is_id_check').val('unable');
}

function join() {
	if($('#is_id_check').val() == 'unable'){
		window.android.join();
		alert('중복체크 해주세요');
		return false;
	}
	
	$.ajax({
		type : 'post',
		url : 'join.jo',
		data : {
			id : $('#id').val(),
			name : $('#name').val(),
			email : $('#email').val(),
			pw : $('#pw').val()
		},
		success : function (data) {
			if(data == 'success'){
				alert('회원가입이 완료되었습니다.');
				web_finish()
			}
		},
		error : function(req) {
			console.log(req.stauts);
			alert('회원가입이 실패하였습니다.');
		}
	});
}

function id_check() {
	$.ajax({
		type : 'post',
		url : 'id_check',
		data : {
			id : $('#id').val()
		},
		success : function (data) {
			if(data == 'true'){
				//아이디 중복일때
				alert('중복된 아이디 입니다.');
			}else if(data == 'false'){
				//아이디 중복이 아닐때
				alert('사용가능한 아이디 입니다.');
				$('#is_id_check').val('able');
			}
		},
		error : function(req) {
			console(req.status);
			alert('아이디 중복검사에 실패하였습니다.');
		}
	});
}