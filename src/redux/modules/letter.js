import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { jsonServerInstance } from "api/json_server";
// import mockData from "data/mockdata.json";

// const LOCAL_KEY = "letters";
// const MODIFY_LETTER = "modify/letter";
// const ADD_LETTER = "add/letter";
// const DELETE_LETTER = "delete/letter";

// export const modifyLetter = (paylod) => {
//   return {
//     type: MODIFY_LETTER,
//     paylod
//   };
// };
// export const addLetter = (paylod) => {
//   return {
//     type: ADD_LETTER,
//     paylod
//   };
// };
// export const deleteLetter = (paylod) => {
//   return {
//     type: DELETE_LETTER,
//     paylod
//   };
// };

// const localLetters = JSON.parse(localStorage.getItem(LOCAL_KEY))
//   ? JSON.parse(localStorage.getItem(LOCAL_KEY))
//   : mockData;

// if (!localLetters) {
//   localStorage.setItem(LOCAL_KEY, JSON.stringify(mockData));
// }

// export const modulesLetters = (state = localLetters, action) => {
//   switch (action.type) {
//     case MODIFY_LETTER: {
//       const newState = state.map((letter) => {
//         if (letter.id === action.paylod.id) {
//           return { ...action.paylod };
//         }
//         return letter;
//       });
//       localStorage.setItem(LOCAL_KEY, JSON.stringify(newState));

//       return newState;
//     }
//     case ADD_LETTER: {
//       localStorage.setItem(LOCAL_KEY, JSON.stringify([...state, { ...action.paylod }]));

//       return [...state, { ...action.paylod }];
//     }
//     case DELETE_LETTER: {
//       const newState = state.filter((letter) => letter.id !== action.paylod);
//       localStorage.setItem(LOCAL_KEY, JSON.stringify(newState));
//       return newState;
//     }
//     default: {
//       return state;
//     }
//   }
// };

const initialState = {
  isLoading: true,
  isError: false,
  error: null,
  letters: {}
};

export const __getLetters = createAsyncThunk("GET_LETTERS", async (payload, thunkAPI) => {
  try {
    const response = await jsonServerInstance.get("/letters");
    return thunkAPI.fulfillWithValue(response.data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const modulesLetters = createSlice({
  name: "modulesLetters,",
  initialState,
  reducers: {
    modifyLetter: (state, action) => {
      // 편지아이디와 일치한것을 수정
      (async () => {
        await jsonServerInstance.patch(`/letters/${action.payload}`, action.payload);
      })();
    },
    addLetter: (state, action) => {
      // 레터에 payload속성으로 새로 생성
      (async () => {
        await jsonServerInstance.post("/letters", { ...action.payload });
      })();
    },
    deleteLetter: (state, action) => {
      // 편지아이디와 일치한것을 삭제
      (async () => {
        await jsonServerInstance.delete(`/letters/${action.payload}`);
      })();
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(__getLetters.pending, (action, state) => {
        state.isLoading = true;
      })
      .addCase(__getLetters.fulfilled, (state, action) => {
        state.isLoading = false;
        state.letters = action.payload;
      })
      .addCase(__getLetters.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addDefaultCase((state, action) => {});
  }
});

export const { modifyLetter, addLetter, deleteLetter } = modulesLetters.actions;
export default modulesLetters.reducer;
