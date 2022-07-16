import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  currentUserOrders: [],
  allOrders: [],
  loading: false,
  error: null,
};

export const getCurrentUserOrderAsync = () => {
  return async (dispatch, getState) => {
    try {
      const { user } = getState();
      console.log(user);
      loading(true);
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const response = await axios.get(
        `https://localhost:7173/api/Orders/${user.userData.id}`,
        config
      );
      console.log(response);
      dispatch(getCurrentUserOrder(response.data));
    } catch (e) {
      dispatch(error(e));
    }
  };
};

export const getAllOrderAsync = () => {
  return async (dispatch, getState) => {
    try {
      loading(true);
      const { user } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const response = await axios.get(
        `https://localhost:7173/api/Orders`,
        config
      );
      console.log(response);
      dispatch(getAllOrder(response.data));
    } catch (e) {
      dispatch(error(e));
    }
  };
};

export const placeOrderAsync=(order)=>{
  return async (dispatch, getState) => {
    try {
      loading(true);
      const { user } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const response = await axios.post(
        `https://localhost:7173/api/Orders`,
        order,
        config
      );
      console.log(response);
      dispatch(getAllOrder(response.data));
    } catch (e) {
      dispatch(error(e));
    }
  };
}

export const updateOrderAsync=(order)=>{
  return async (dispatch,getState)=>{
    try{
      loading(true);
      const { user } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const response = await axios.put(
        `https://localhost:7173/api/Orders`,
        order,
        config
      );
      console.log(response);
      dispatch(getAllOrder(response.data));

    }catch(e){
      dispatch(error(e));
    }
  }
}

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    getAllOrder: (state, action) => {
      state.allOrders = action.payload;
      state.loading = false;
      state.error = null;
    },
    getCurrentUserOrder: (state, action) => {
      state.currentUserOrders = action.payload;
      state.loading = false;
      state.error = null;
    },
    loading: (state, action) => {
      state.loading = action.payload;
    },
    error: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { getAllOrder, getCurrentUserOrder, loading, error } =
  ordersSlice.actions;
export default ordersSlice.reducer;
