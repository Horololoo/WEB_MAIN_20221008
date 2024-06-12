function addJavascript(jsname) { // 자바스크립트 외부 연동
	var th = document.getElementsByTagName('head')[0];
	var s = document.createElement('script');
	s.setAttribute('type','text/javascript');
	s.setAttribute('src',jsname);
	th.appendChild(s);
}
addJavascript('/js/security.js'); // 암복호화 함수
addJavascript('/js/session.js'); // 세션 함수
addJavascript('/js/cookie.js'); // 쿠키 함수
addJavascript('/js/pop_up_timer.js'); // 로그아웃 타이머 함수

const check_input = () => {
    const loginForm = document.getElementById('login_form');
    const loginBtn = document.getElementById('login_btn');
    const emailInput = document.getElementById('typeEmailX');
    const passwordInput = document.getElementById('typePasswordX');
    const c = '아이디, 패스워드를 체크합니다';
    alert(c);

    const emailValue = emailInput.value.trim();
    const passwordValue = passwordInput.value.trim();

    const idsave_check = document.getElementById('idSaveCheck');
    
    if (emailValue.length > 10) {
        alert('아이디는 최소 10글자 이하로 입력해야 합니다.');
        return false;
    }

    if (passwordValue.length > 15) {
        alert('비밀번호는 최소 15글자 이하로 입력해야 합니다.');
        return false;
    }

    if (/(.)\1{2}/.test(emailValue)) {
        alert('아이디에 3글자 이상 반복 입력할 수 없습니다.');
        return false;
    }

    if (/\d{2}/.test(emailValue)) {
        alert('아이디에 연속되는 숫자 2개 이상 반복 입력할 수 없습니다.');
        return false;
    }

    const hasSpecialChar = /[!,@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(passwordValue);
    if (!hasSpecialChar) {
        alert('패스워드는 특수문자를 1개 이상 포함해야 합니다.');
        return false;
    }

    const hasUpperCase = /[A-Z]+/.test(passwordValue);
    const hasLowerCase = /[a-z]+/.test(passwordValue);
    if (!hasUpperCase || !hasLowerCase) {
        alert('패스워드는 대소문자를 1개 이상 포함해야 합니다.');
        return false;
    }

    // 검사 마무리 단계 쿠키 저장, 최하단 submit 이전
    if(idsave_check.checked == true) {// 아이디 체크 o
        alert("쿠키를 저장합니다.", emailValue);
        setCookie("id", emailValue, 1); // 1일 저장
        alert("쿠키 값 :" + emailValue);
        login_count();
        logout_count();
    }
    else
    { // 아이디 체크 X
        setCookie("id", emailValue.value, 0); // 날짜를 0 - 쿠키 삭제
    }

    console.log('이메일: ', emailValue);
    console.log('비밀번호: ', passwordValue);
    session_set(); // 세션 생성
    loginForm.submit();

    const sanitizedPassword = check_xss(passwordValue);
    const sanitizedEmail = check_xss(emailValue);

    if (!sanitizedEmail) {
        // Sanitize된 이메일 사용
        return false;
    }

    if (!sanitizedPassword) {
        // Sanitize된 비밀번호 사용
        return false;
    }
    takeTarget();
};
  
  // 로그인 처리 함수
  function login_count() {
    const loginCount = getLoginCountFromCookie() + 1; // 기존 횟수 + 1
    setLoginCountCookie(loginCount); // 횟수 업데이트
    console.log('로그인 횟수:', loginCount);
  
    // 추가적인 로그인 처리 로직을 여기에 작성합니다.
    // ...
  }
  
  // 로그아웃 처리 함수
  function logout_count() {
    const logoutCount = getLogoutCountFromCookie() + 1; // 기존 횟수 + 1
    setLogoutCountCookie(logoutCount); // 횟수 업데이트
    console.log('로그아웃 횟수:', logoutCount);
  
    // 추가적인 로그아웃 처리 로직을 여기에 작성합니다.
    // ...
  }
  
  // 로그인 제한 상태 확인
  function isLoginRestricted() {
    const failedCount = getLoginFailedCountFromCookie();
    return failedCount >= 3; // 실패 횟수가 3 이상인 경우 제한 상태로 간주
  }
  
  // 로그인 실패 처리 함수
  function login_failed() {
    const failedCount = getLoginFailedCountFromCookie() + 1; // 기존 횟수 + 1
    setLoginFailedCountCookie(failedCount); // 횟수 업데이트
    console.log('로그인 실패 횟수:', failedCount);
  
    if (isLoginRestricted()) {
      alert('로그인이 제한되었습니다.');
    } else {
      alert('로그인에 실패하였습니다.');
    }
  
    // 추가적인 로그인 실패 처리 로직을 여기에 작성합니다.
    // ...
  }


function init(){ // 로그인 폼에 쿠키에서 가져온 아이디 입력
    const emailInput = document.getElementById('typeEmailX');
    const idsave_check = document.getElementById('idSaveCheck');
    let get_id = getCookie("id");

    if(get_id) {
        emailInput.value = get_id;
        idsave_check.checked = true;
    }
    session_check(); // 세션 유무 검사
    takeTarget(); // 자동 로그아웃 시작
}       

document.getElementById("login_btn").addEventListener('click', check_input);