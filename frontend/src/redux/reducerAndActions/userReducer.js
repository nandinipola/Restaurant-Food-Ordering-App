import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  userData: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
  token: localStorage.getItem("token") ? localStorage.getItem("token") : null,
  error: null,
  loading: false,
  RegisterMessage: null,
};
export const authenticateAsync = (email, password) => {
  return async (dispatch, getState) => {
    try {
      dispatch(loading(true));
      const response1 = await axios.post(
        "https://localhost:7131/api/User/login",
        {
          email: email,
          password: password,
        }
      );
      console.log(response1);
      if (response1.status == 200) {
        localStorage.setItem("token", response1.data);
        const config = {
          headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${response1.data}`,
          },
      };
        const response2 = await axios.get(
          `https://localhost:7131/api/User/${email}`,
          config
        );
        console.log(response2);
        localStorage.setItem("user", JSON.stringify(response2.data));
        dispatch(
          authenticate({
            token: response1.data,
            ...response2.data,
          })
        );
      }
    } catch (e) {
      dispatch(error(e));
    }
  };
};

export const registerAsync = (user) => {
  return async (dispatch, getState) => {
    try {
      dispatch(loading(true));
      const response = await axios.post(
        "https://localhost:7131/api/User/register",
        user
      );
      if (response.request.status != 200) throw "Something Went wrong";
      console.log(response);
      dispatch(register(response.data));
    } catch (e) {
      dispatch(error(e));
    }
  };
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    authenticate: (state, action) => {
      state.userData = action.payload;
      state.token = action.payload.token;
      state.loading = false;
      state.error = null;
    },
    register: (state, action) => {
      state.RegisterMessage = action.payload;
      state.loading = false;
      state.error = null;
      setTimeout(() => {
        state.RegisterMessage = null;
      }, 8000);
    },
    loading: (state, action) => {
      state.loading = action.payload;
    },
    error: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state, action) => {
      state.error = null;
      state.loading = false;
      state.token = null;
      state.userData = null;
      localStorage.removeItem("token");
    },
  },
});

export const { authenticate, register, loading, error, logout } =
  userSlice.actions;

export default userSlice.reducer;
