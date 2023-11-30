import { authServerInstance } from "api/auth";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
  isLoading: false,
  isError: false,
  error: null,
  currentUser: {}
};

// 로

export const __loginAuth = createAsyncThunk("GET_AUTH", async (payload, thunkAPI) => {
  try {
    const response = await authServerInstance.post("/login?expiresIn=10m", payload);
    console.log(response);
    return thunkAPI.fulfillWithValue(response.data);
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

const modulesAuth = createSlice({
  name: "modulesAuth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(__loginAuth.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(__loginAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload;
      })
      .addCase(__loginAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      })
      .addDefaultCase((state, action) => {});
  }
});

export const {} = modulesAuth.actions;
export default modulesAuth.reducer;
