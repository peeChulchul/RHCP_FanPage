import { authServerInstance } from "api/auth";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
  isLoading: true,
  isError: false,
  error: null,
  currentUser: {},
  message: null
};

export const __loginAuth = createAsyncThunk("LOGIN_AUTH", async (payload, thunkAPI) => {
  try {
    const response = await authServerInstance.post("/login?expiresIn=30m", payload);
    return thunkAPI.fulfillWithValue(response.data);
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

export const __getAuth = createAsyncThunk("GET_AUTH", async (payload, thunkAPI) => {
  try {
    const response = await authServerInstance.get("/user", {
      headers: {
        Authorization: `Bearer ${payload}`
      }
    });
    return thunkAPI.fulfillWithValue(response.data);
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

export const __modifyAuth = createAsyncThunk("MODIFY_AUTH", async (payload, thunkAPI) => {
  try {
    const form = new FormData();
    form.append("nickname", payload.nickname);
    form.append("avatar", payload.avatar);
    const response = await authServerInstance.patch("/profile", form, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${payload.accesToken}`
      }
    });
    return thunkAPI.fulfillWithValue(response.data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const modulesAuth = createSlice({
  name: "modulesAuth",
  initialState,
  reducers: {
    authLogout: (state, action) => {
      state.currentUser = {};
      sessionStorage.clear("AUTH");
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(__loginAuth.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(__loginAuth.fulfilled, (state, action) => {
        sessionStorage.setItem("AUTH", JSON.stringify(action.payload));
        state.currentUser = action.payload;
        state.isLoading = false;
      })
      .addCase(__loginAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      })
      .addCase(__getAuth.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(__getAuth.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        const accesToken = JSON.parse(sessionStorage.getItem("AUTH"));
        state.currentUser.accesToken = accesToken.accessToken;
        state.isLoading = false;
      })
      .addCase(__getAuth.rejected, (state, action) => {
        state.isError = true;
        state.error = action.payload;
        state.isLoading = false;
      })

      .addCase(__modifyAuth.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(__modifyAuth.fulfilled, (state, action) => {
        state.currentUser.avatar = action.payload.avatar ? action.payload.avatar : state.currentUser.avatar;
        state.currentUser.nickname = action.payload.nickname;
        state.isLoading = false;
      })
      .addCase(__modifyAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      })

      .addDefaultCase((state, action) => {});
  }
});

export const { authLogout } = modulesAuth.actions;
export default modulesAuth.reducer;
