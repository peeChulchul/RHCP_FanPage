import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { jsonServerInstance } from "api/json_server";

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
export const __deleteLetter = createAsyncThunk("DELETE_LETTERS", async (payload, thunkAPI) => {
  try {
    await jsonServerInstance.delete(`/letters/${payload}`);
    return thunkAPI.fulfillWithValue(payload);
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
        state.letters = [...state.letters, action.payload];
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
        state.isLoading = false;
        state.letters = state.letters.filter((letter) => letter.id !== action.payload);
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
