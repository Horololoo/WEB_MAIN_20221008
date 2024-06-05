function session_del() { // 세션 삭제
    if (sessionStorage) {
        sessionStorage.removeItem("Session_Storage_encrypted");
        alert('로그아웃 버튼 클릭 확인 : 세션 스토리지를 삭제합니다.');
    } else {
        alert("세션 스토리지 지원 X");
    }
}

function logout(){
    session_del(); // 세션 삭제
    location.href='../Index.html';
}

document.getElementById("logouttt_btn").addEventListener('click', logout);