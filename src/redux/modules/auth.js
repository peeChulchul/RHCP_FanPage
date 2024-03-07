import { authServerInstance } from "api/auth";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
  isLoading: false,
  isError: false,
  error: null,
  currentUser: {},
  message: null,
  status: null
};

export const __signUpAuth = createAsyncThunk("SIGNUP_AUTH", async (payload, thunkAPI) => {
  try {
    const response = await authServerInstance.post("/register", {
      id: payload.id,
      password: payload.password,
      nickname: payload.nickname
    });
    return thunkAPI.fulfillWithValue(response.data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response);
  }
});

export const __loginAuth = createAsyncThunk("LOGIN_AUTH", async (payload, thunkAPI) => {
  try {
    const response = await authServerInstance.post("/login?expiresIn=30m", payload);
    return thunkAPI.fulfillWithValue(response.data);
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error.response);
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
    return thunkAPI.rejectWithValue(error.response);
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
    console.log(error);
    return thunkAPI.rejectWithValue(error.response);
  }
});

// export const __CheckTokenAuth = createAsyncThunk("CHECKTOKEN_AUTH", async (payload, thunkAPI) => {
//   try {
//     const response = await authServerInstance.get("/user", {
//       headers: {
//         Authorization: `Bearer ${payload}`
//       }
//     });
//     return thunkAPI.fulfillWithValue(response.data);
//   } catch (error) {
//     console.log(error);
//     return thunkAPI.rejectWithValue(error.response.data.message);
//   }
// });

const modulesAuth = createSlice({
  name: "modulesAuth",
  initialState,
  reducers: {
    authLogout: (state, action) => {
      state.currentUser = {};
      sessionStorage.clear("AUTH");
      state.message = "로그아웃이 완료되었습니다.";
    },
    authClear: (state, action) => {
      state.currentUser = {};
      sessionStorage.clear("AUTH");
      // state.message = "로그아웃이 완료되었습니다.";
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(__loginAuth.pending, (state, action) => {
        state.isLoading = true;
        state.message = null;
        state.isError = null;
        state.error = null;
      })
      .addCase(__loginAuth.fulfilled, (state, action) => {
        sessionStorage.setItem("AUTH", JSON.stringify(action.payload));
        state.currentUser = action.payload;
        state.isLoading = false;
        state.message = "로그인이 완료되었습니다.";
        state.status = null;
      })
      .addCase(__loginAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload.data.message;
        state.status = action.payload.status;
      })
      .addCase(__getAuth.pending, (state, action) => {
        state.message = null;
        state.isLoading = true;
        state.isError = null;
        state.error = null;
      })
      .addCase(__getAuth.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        const accesToken = JSON.parse(sessionStorage.getItem("AUTH"));
        state.currentUser.accesToken = accesToken.accessToken;
        state.status = null;
        state.isLoading = false;
      })
      .addCase(__getAuth.rejected, (state, action) => {
        state.isError = true;
        state.error = action.payload.data.message;
        state.isLoading = false;
        state.status = action.payload.status;
        state.currentUser = {};
      })

      .addCase(__modifyAuth.pending, (state, action) => {
        state.message = null;
        state.isLoading = true;
        state.isError = null;
        state.error = null;
      })
      .addCase(__modifyAuth.fulfilled, (state, action) => {
        state.currentUser.avatar = action.payload.avatar ? action.payload.avatar : state.currentUser.avatar;
        state.currentUser.nickname = action.payload.nickname;
        state.isLoading = false;
        state.status = null;
        state.message = "프로필 수정이 완료되었습니다.";
      })
      .addCase(__modifyAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload.data.message;
        state.status = action.payload.status;
      })
      .addCase(__signUpAuth.pending, (state, action) => {
        state.message = null;
        state.isLoading = true;
        state.isError = null;
        state.error = null;
      })
      .addCase(__signUpAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = null;
        state.message = "회원가입이 완료되었습니다.";
      })
      .addCase(__signUpAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload.data.message;
        state.status = action.payload.status;

        // state.message = action.payload;
      })

      .addDefaultCase((state, action) => {});
  }
});

export const { authLogout, authClear } = modulesAuth.actions;
export default modulesAuth.reducer;
