function web_finish() {
	window.android.webview_finish();
}

function need_id_check() {
	$('#is_id_check').val('unable');
}

function item_check(item) {
	//유효한 형태인지 부터 판단
	var data = validate(item);
	if (data.code != 'valid') {
		alert(data.desc);
		$('[name=' + item + ']').focus();
		return false;
	} else {
		return true;
	}
}

function go_join() {
	//아이디 확인
	if (!item_check('id'))
		return;
	//이름 확인
	if(!item_check('name'))
		return;
	//이메일 확인
	if (!item_check('email'))
		return; 
	//비밀번호
	if (!item_check('pw'))
		return;
	//비밀번호 확인
	if (!item_check('pwd_ck'))
		return;
	//중복체크 확인
	if ($('#is_id_check').val() == 'unable') {
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
		success : function(data) {
			if (data == 'success') {
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
	var result = validate('id');
	if (result.code != 'valid') {
		alert(result.desc);
		return;
	}
	$.ajax({
		type : 'post',
		url : 'id_check',
		data : {
			id : $('#id').val()
		},
		success : function(data) {
			if (data == 'true') {
				// 아이디 중복일때
				alert(join.id.unusable.desc);
			} else if (data == 'false') {
				// 아이디 중복이 아닐때
				alert(join.id.usable.desc);
				$('#is_id_check').val('able');
			}
		},
		error : function(req) {
			console(req.status);
			alert('아이디 중복검사에 실패하였습니다.');
		}
	});
}

function validate(tag) {
	var data = $('[name=' + tag + ']').val();
	if (tag == 'id') {
		data = join.id_status(data);
	} else if (tag == 'name'){
		data = join.name_status(data);
	} else if (tag == 'email'){
		data = join.email_status(data);
	} else if (tag == 'pw') {
		data = join.pwd_status(data);
	} else if (tag == 'pwd_ck') {
		data = join.pwd_ck_status(data);
	} 

	$('#' + tag + '_status').text(data.desc);
	$('#' + tag + '_status').removeClass('valid invalid');
	$('#' + tag + '_status').addClass(
			data.code == 'valid' ? 'valid' : 'invalid');
	
	return data;
}

var join = {
		
	common : {
		empty : { code : 'empty', desc : '해당칸을 입력하세요' },
		space : { code : 'space', desc : '공백 없이 입력해주세요' },
		min : { code : 'min', desc : '최소 4글자 이상 입력하세요' },
		max : { code : 'max', desc : '최대 10글자 이하 입력하세요' }
	},
	id : {
		empty : { code : 'empty', desc : '아이디를 입력하세요' },
		invalid : { code : 'invalid', desc : '아이디는 영소문자로 시작하며 영소문자 또는 숫자만 입력해주세요.' },
		valid : { code : 'valid', desc : '아이디 중복 확인 하세요' },
		usable : { code : 'usable', desc : '사용 가능한 아이디 입니다.' },
		unusable : { code : 'unusable', desc : '이미 사용 중인 아이디 입니다.' }
	},
	name:{
		empty : {code : 'empty', desc : '이름을 입력하세요' },
		space : { code : 'space', desc : '공백 없이 입력해주세요' },
		valid : { code : 'valid', desc : '이름이 입력되었습니다.' },
		min : {code : 'min', desc : '2글자 이상 입력해주세요'},
		max : {code : 'max', desc : '10글자 이하 입력하세요'}
	},
	email : {
		empty : { code : 'empty', desc : '이메일을 입력하세요' },
		invalid : { code : 'invalid', desc : '이메일을 입력해주세요.' },
		lack : { code : 'lack', desc : '이메일 형식이 아닙니다.' },
		valid : { code : 'valid', desc : '이메일이 입력되었습니다.' },
	},
	pw : {
		empty : { code : 'empty', desc : '비밀번호를 입력하세요' },
		invalid : { code : 'invalid', desc : '영소문자, 숫자만 입력해주세요.' },
		lack : { code : 'lack', desc : '영소문자, 숫자 모두 포함하여야 합니다.' },
		valid : { code : 'valid', desc : '사용 가능한 비밀번호입니다.' },
		equal : { code : 'valid', desc : '비밀번호가 일치합니다.' },
		notequal : { code : 'invalid', desc : '비밀번호가 일치하지 않습니다.' }
	},
	// 아이디 판별 함수 선언
	id_usable : function(data) {
		if (data == 'true') {
			return this.id.usable;
		} else {
			return this.id.unusable;
		}
	},

	id_status : function(id) { // 영 소문자, 숫자
		var reg = /[^a-z0-9]/g;
		var space = /\s/g;

		if (id == '') {
			return this.id.empty;
		} else if (id.match(space)) {
			return this.common.space;
		} else if (reg.test(id)) {
			return this.id.invalid;
		} else if (id.length < 4) { // 4문자 이상
			return this.common.min;
		} else if (id.length > 10) { // 5문자 이하
			return this.common.max;
		} else {
			return this.id.valid;
		}
	},
	
	name_status : function(name){
		var space = /\s/g;
		if (name.trim() == ''){
			return this.name.empty;
		}else if(name.match(space)){
			return this.name.space;
		}else if (name.length < 2) { // 5문자 이상
			return this.name.min;
		}else if (name.length > 10) { // 5문자 이하
			return this.name.max;
		}else {
			return this.name.valid;
		}
	},
	
	email_status : function(email) {
		var space = /\s/g;
		var emailForm = /^([0-9a-zA-Z_-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
		if (email == '') {
			return this.email.empty;
		} else if (email.match(space)) {
			return this.common.space;
		} else if (!emailForm.test(email)) {
			return this.email.lack;
		} else {
			return this.email.valid;
		}
	},
	
	pwd_status : function(pw) { // 영소문자, 숫자 모두 포함
		var space = /\s/g;
		var reg = /[^a-z0-9]/g;
		var digit = /[0-9]/g;
		if (pw == '') {
			return this.pw.empty;
		} else if (pw.match(space)) {
			return this.common.space;
		} else if (reg.test(pw)) {
			return this.pw.invalid;
		} else if (!digit.test(pw)) {
			return this.pw.lack;
		} else {
			return this.pw.valid;
		}
	},
	
	pwd_ck_status : function(pwd_ck) {
		if(pwd_ck.trim() == ''){
			return this.pw.empty;
		}else if (pwd_ck == $('[name=pw]').val()) {
			return this.pw.equal;
		} else if (pwd_ck != $('[name=pw]').val()) {
			return this.pw.notequal;
		}
	},

}
