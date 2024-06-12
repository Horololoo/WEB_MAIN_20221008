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

function session_join_set(){ //세션 저장(객체)    
    let f_name = document.querySelector("#firstName").value;
    let l_name = document.querySelector("#lastName").value;
    let b_day = document.querySelector("#birthdayDate").value;
    let gender = document.querySelector("#inlineRadioOptions");
    let email = document.querySelector("#emailAddress").value;
    let p_number = document.querySelector("#phoneNumber").value;
    let class_check = document.querySelector(".select form-control-lg");
    let random = new Date(); // 랜덤 타임스탬프

    const newSignUp = new SignUp(f_name, l_name, b_day, gender, email, p_number, class_check, random);
    console.log(newSignUp.fullName); // John Doe
    console.log(newSignUp.contactInfo); // johndoe@email.com 123-456-7890

    if (sessionStorage) {
        const objString = JSON.stringify(newSignUp); // 객체 -> JSON 문자열 변환
        let en_text = encrypt_text(objString); // 암호화
        sessionStorage.setItem("Session_Storage_new_user", objString);
        sessionStorage.setItem("Session_Storage_new_user_encryted", en_text);
    } else {
        alert("세션 스토리지 지원 x");
        } 
    }
    
    function session_join_get() { // 세션 읽기
        if (sessionStorage) {
            const encryptedData = sessionStorage.getItem("Session_Storage_new_user_encryted");
            console.log(encryptedData); // 암호화된 데이터 출력
            return encryptedData;
        } else {
            alert("세션 스토리지 지원 X");
            return null;
        }
    }

    function sess_check() {
        var encryptedData = sessionStorage.getItem("Session_Storage_encrypted");
        if (!encryptedData) { // 세션에 저장된 암호화된 데이터가 없으면
            alert("로그인이 필요합니다. 로그인 페이지로 이동합니다.");
            window.location.href = '../login/login.html'; // 로그인 페이지로 리디렉션
        }
    }
    
    

//     // 자동 로그아웃 설정 (5분 후)
// function setAutoLogout() {
//     setTimeout(function() {
//         session_del(); // 5분 후 자동 로그아웃
//     }, 1 * 60 * 1000); // 5분 * 60초 * 1000밀리초
// }