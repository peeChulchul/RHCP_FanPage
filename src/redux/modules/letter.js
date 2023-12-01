import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { jsonServerInstance } from "api/json_server";

const initialState = {
  isLoading: true,
  isError: false,
  error: null,
  letters: [],
  message: null
};

export const __getLetters = createAsyncThunk("GET_LETTERS", async (payload, thunkAPI) => {
  try {
    const response = await jsonServerInstance.get(`/letters/?_sort=timestamp&_order=desc`);
    return thunkAPI.fulfillWithValue(response.data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
export const __addLetters = createAsyncThunk("ADD_LETTERS", async (payload, thunkAPI) => {
  try {
    const response = await jsonServerInstance.post("/letters", { ...payload });
    return thunkAPI.fulfillWithValue(response.data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
export const __modifyLetter = createAsyncThunk("MODIFY_LETTERS", async (payload, thunkAPI) => {
  try {
    const response = await jsonServerInstance.patch(`/letters/${payload.id}`, payload);
    return thunkAPI.fulfillWithValue(response.data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

// AUTH변경시 json-server에있는 uid가 payload(uid)값과 같은것만 가져와서 내용 변경
export const __modifyLetterAuth = createAsyncThunk("MODIFY_LETTERS_AUTH", async (payload, thunkAPI) => {
  try {
    const response = await jsonServerInstance.get(`letters?uid=${payload.id}`);
    response.data.forEach(async (letter) => {
      await jsonServerInstance.patch(`letters/${letter.id}`, {
        nickname: payload.nickname,
        avatar: payload.avatar
      });
    });
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const __deleteLetter = createAsyncThunk("DELETE_LETTERS", async (payload, thunkAPI) => {
  try {
    const deleteLetter = await jsonServerInstance.delete(`/letters/${payload}`);
    console.log(deleteLetter);
    return thunkAPI.fulfillWithValue({ id: payload, message: "삭제가 완료되었습니다." });
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const modulesLetters = createSlice({
  name: "modulesLetters,",
  initialState,
  reducers: {},
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
        console.log(action.payload);
      })
      .addCase(__addLetters.pending, (action, state) => {
        state.isLoading = true;
      })
      .addCase(__addLetters.fulfilled, (state, action) => {
        state.isLoading = false;
        state.letters = [action.payload, ...state.letters];
      })
      .addCase(__addLetters.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        console.log(action.payload);
      })
      .addCase(__modifyLetter.pending, (action, state) => {
        state.isLoading = true;
      })
      .addCase(__modifyLetter.fulfilled, (state, action) => {
        state.isLoading = false;
        state.letters = state.letters.map((letter) => {
          if (letter.id === action.payload.id) {
            return action.payload;
          }
          return letter;
        });
      })
      .addCase(__modifyLetter.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        console.log(action.payload);
      })
      .addCase(__deleteLetter.pending, (action, state) => {
        state.isLoading = true;
      })
      .addCase(__deleteLetter.fulfilled, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
        state.message = action.payload.message;
        state.letters = state.letters.filter((letter) => letter.id !== action.payload.id);
      })
      .addCase(__deleteLetter.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        console.log(action.payload);
      })
      .addDefaultCase((state, action) => {});
  }
});

export const {} = modulesLetters.actions;
export default modulesLetters.reducer;
