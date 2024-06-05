// function session_set(){ // 세션 저장
//     let session_id = document.querySelector("#typeEmailX");
//     if (sessionStorage) {
//         sessionStorage.setItem("Session_Storage_id", session_id.value);
//     }
//     else{
//         alert("로컬 스토리지 지원 X")
//     }
// }

function session_set(){ //세션 저장(객체)    
    let id = document.querySelector("#typeEmailX");
    let password = document.querySelector("#typePasswordX");
    let random = new Date(); // 랜덤 타임스탬프
    
    const obj = { // 객체 선언
    id : id.value,
    otp : random
    }
    
    if (sessionStorage) {
        const objString = JSON.stringify(obj); // 객체 -> JSON 문자열 변환
        let en_text = encrypt_text(objString); // 암호화
        sessionStorage.setItem("Session_Storage_object", objString);
        sessionStorage.setItem("Session_Storage_encrypted", en_text);
    } else {
        alert("세션 스토리지 지원 x");
    }   
}


function session_get(){ // 세션 읽기
    if (sessionStorage) {
        return sessionStorage.getItem("Session_Storage_encrypted");
    }
    else{
        alert("세션 스토리지 지원 X")
    }
}

function session_check() { // 세션 검사
    if (sessionStorage.getItem("Session_Storage_encrypted")) {
        alert("이미 로그인 되었습니다.");
        location.href = '../login/index_login.html'; // 로그인된 페이지로 이동
    }
}