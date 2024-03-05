## 기술스택

<img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white"> <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white"> <img  src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white"> <img src="https://img.shields.io/badge/redux-764ABC?style=for-the-badge&logo=redux&logoColor=white">
<img src="https://img.shields.io/badge/styledcomponents-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=white">
## 목적 및 기능

* 레드핫 칠리페퍼스 팬 페이지 만들기
* 회원가입 및 로그인
* 미들웨어 사용
* 팬레터 작성 및 수정 삭제 JSON_SERVER에 저장 (Glitch로 배포)
* 공식뮤직비디오 재생
* 앨범 및 수록곡 확인

<img width="913" alt="image" src="https://github.com/peeChulchul/S_FanPage/assets/144536397/022700e5-7e87-4be6-a597-cd20fadbcb3a">


## 트러블 슈팅

### 프로필 수정

#### as-is
프로필 변경시 이미지외의 파일도 업로드 되는 문제가 발생

#### to-be
업로드 가능한 파일의 확장자를 배열로 만들어 현재 업로드된 파일의 확장자와 비교하여 업로드 여부를 결정 하도록 수정

### 유저 토큰만료

#### as-is
토큰 만료상태에서 편지를 남기면 오류가 발생

#### to-be
axiosInterceptor를 사용해 토큰이 만료된경우 로그인 모달을 띄우도록 수정
