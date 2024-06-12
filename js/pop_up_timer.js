let timer; // 타이머 변수를 전역으로 설정

const takeTarget = () => {
    const remainingMin = document.getElementById("remaining__min");
    const remainingSec = document.getElementById("remaining__sec");
    let min = parseInt(remainingMin.textContent.trim());
    let sec = parseInt(remainingSec.textContent.trim());

    timer = setInterval(() => {
        if (sec === 0) {
            if (min === 0) {
                clearInterval(timer);
                alert('로그아웃되었습니다.');
                // 로그아웃 처리
                window.location.href = 'login/logout.html';
            } else {
                min -= 1;
                sec = 59;
            }
        } else {
            sec -= 1;
        }

        remainingMin.textContent = String(min).padStart(2, '0');
        remainingSec.textContent = String(sec).padStart(2, '0');
    }, 1000);
};

document.addEventListener("DOMContentLoaded", () => {
    takeTarget(); // 페이지가 로드될 때 타이머 시작
});
