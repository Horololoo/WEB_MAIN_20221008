function setCookie(name, value, expiredays){
    var date = new Date();
    date.setDate(date.getDate() + expiredays);
    document.cookie = escape(name) + "=" + escape(value) + "; expires=" + date.toUTCString() + "; path=/" + ";SameSite=None; Secure";
}

function getCookie(name) {
    var cookie = document.cookie;
    console.log("쿠키를 요청합니다.");
    if(cookie != ""){
        var cookie_array = cookie.split("; ");
        for(var index in cookie_array) {
            var cookie_name = cookie_array[index].split("=");

            if(cookie_name[0] == "id") {
                return cookie_name[1];
            }
        }
    }
    return;
}

// 로그인 횟수 쿠키에 저장
function setLoginCountCookie(count) {
    document.cookie = `login_cnt=${count}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`;
  }
  
  // 로그아웃 횟수 쿠키에 저장
  function setLogoutCountCookie(count) {
    document.cookie = `logout_cnt=${count}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`;
  }
  
  // 로그인 횟수 가져오기
  function getLoginCountFromCookie() {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith('login_cnt=')) {
        const count = parseInt(cookie.substring('login_cnt='.length), 10);
        if (!isNaN(count)) {
          return count;
        }
      }
    }
    return 0;
  }
  
  // 로그아웃 횟수 가져오기
  function getLogoutCountFromCookie() {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith('logout_cnt=')) {
        const count = parseInt(cookie.substring('logout_cnt='.length), 10);
        if (!isNaN(count)) {
          return count;
        }
      }
    }
    return 0;
  }


// 로그인 실패 횟수 쿠키에 저장
function setLoginFailedCountCookie(count) {
    document.cookie = `login_failed_cnt=${count}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`;
  }
  
  // 로그인 실패 횟수 가져오기
  function getLoginFailedCountFromCookie() {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith('login_failed_cnt=')) {
        const count = parseInt(cookie.substring('login_failed_cnt='.length), 10);
        if (!isNaN(count)) {
          return count;
        }
      }
    }
    return 0;
  }