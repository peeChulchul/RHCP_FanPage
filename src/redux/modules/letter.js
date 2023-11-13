import mockData from "data/mockdata.json";

const LOCAL_KEY = "letters";
const MODIFY_LETTER = "modify/letter";
const ADD_LETTER = "add/letter";
const DELETE_LETTER = "delete/letter";

export const modifyLetter = (paylod) => {
  return {
    type: MODIFY_LETTER,
    paylod
  };
};
export const addLetter = (paylod) => {
  return {
    type: ADD_LETTER,
    paylod
  };
};
export const deleteLetter = (paylod) => {
  return {
    type: DELETE_LETTER,
    paylod
  };
};

const localLetters = JSON.parse(localStorage.getItem(LOCAL_KEY))
  ? JSON.parse(localStorage.getItem(LOCAL_KEY))
  : mockData;

if (!localLetters) {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(mockData));
}

export const modulesLetters = (state = localLetters, action) => {
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
      console.log(action.paylod);
      const newState = state.filter((letter) => letter.id !== action.paylod);
      localStorage.setItem(LOCAL_KEY, JSON.stringify(newState));
      return newState;
    }
    default: {
      return state;
    }
  }
};
