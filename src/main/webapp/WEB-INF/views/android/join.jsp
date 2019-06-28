<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<title></title>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, user-scalable=no", initial-scale="1.0">
<script type="text/javascript" src="https://code.jquery.com/jquery-3.4.1.min.js"></script>

<!-- Compiled and minified CSS -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
<!-- Compiled and minified JavaScript -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>

<script type="text/javascript" src="resources/js/join.js"></script>
<link rel="stylesheet" href="resources/css/join.css?<%=new java.util.Date().getTime()%>">
<script type="text/javascript">

</script>
</head>
<body>

<div id="text">
<input class="join_text" type="text" placeholder="아이디" name="id" id="id" onkeyup="need_id_check()">
<a class="waves-effect waves-light btn" id="id_check_btn" onclick="id_check()">중복체크</a>
<input class="join_text" type="text" placeholder="이름" name="name" id="name">
<input class="join_text" type="email" placeholder="이메일" name="email" id="email">
<input class="join_text" type="password" placeholder="비밀번호" name="pw" id="pw">
<input class="join_text" type="password" placeholder="비밀번호 확인" id="check_pw">
<p id="pw_status_text"></p>
</div>
<div id="button">
<a class="waves-effect waves-light btn join_button" id="cancel" onclick="web_finish()">취소</a>
<a class="waves-effect waves-light btn join_button" id="join" onclick="join()">등록</a>
</div>

<input type="hidden" id="is_id_check" value="unable">

</body>
</html>