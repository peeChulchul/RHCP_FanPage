# 목적 및 기능

* 레드핫 칠리페퍼스 팬 페이지 만들기
* 팬레터 작성 및 수정 삭제 (로컬스토리지에 저장)
* 공식뮤직비디오 재생
* 앨범 및 수록곡 확인

# 주요기능 사용법
<img width="913" alt="image" src="https://github.com/peeChulchul/S_FanPage/assets/144536397/022700e5-7e87-4be6-a597-cd20fadbcb3a">

* 원하는 맴버를 클릭한 뒤 닉네임과 내용을 입력해주시면 아래에 편지가 추가됩니다.
* 아래의 리듀서를 통해 자동으로 로컬스토리지에 값을 추가하게 됩니다.
```javascript
const modulesLetters = (state = localLetters, action) => {
  switch (action.type) {
    case MODIFY_LETTER: {
      const newState = state.map((letter) => {
        if (letter.id === action.paylod.id) {
          return { ...action.paylod };
        }
        return letter;
      });
      localStorage.setItem(LOCAL_KEY, JSON.stringify(newState));

      return newState;
    }
    case ADD_LETTER: {
      localStorage.setItem(LOCAL_KEY, JSON.stringify([...state, { ...action.paylod }]));

      return [...state, { ...action.paylod }];
    }
    case DELETE_LETTER: {
      const newState = state.filter((letter) => letter.id !== action.paylod);
      localStorage.setItem(LOCAL_KEY, JSON.stringify(newState));
      return newState;
    }
    default: {
      return state;
    }
  }
};
```
