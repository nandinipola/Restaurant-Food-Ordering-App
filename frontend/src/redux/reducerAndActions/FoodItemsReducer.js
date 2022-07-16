import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  foodItems: [],
  currentItem: null,
  loading: false,
  error: null,
  addMessage: null,
};

export const getFoodItemsAsync = () => {
  return async (dispatch, getState) => {
    try {
      const { user } = getState();
      dispatch(loading(true));
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const response = await axios.get(
        "https://localhost:7173/api/FoodItems",
        config
      );
      console.log(response);
      dispatch(getFoodItems(response.data));
    } catch (e) {
      dispatch(error(e));
    }
  };
};
export const getItemDetailsAsync = (id) => {
  return async (dispatch, getState) => {
    console.log(id);
    try {
      dispatch(loading(true));
      const { user } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const response = await axios.get(
        `https://localhost:7173/api/FoodItems/${id}`,
        config
      );
      console.log(response.data);
      dispatch(getItemDetails(response.data));
    } catch (e) {
      dispatch(error(e));
    }
  };
};

export const addFoodItemsAsync = (title, imageUrl, description, price) => {
  return async (dispatch, getState) => {
    try {
      dispatch(loading(true));
      const { user } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const response = await axios.post(
        "https://localhost:7173/api/FoodItems",
        {
          title,
          imageUrl,
          description,
          price: +price,
        },
        config
      );
      console.log(response);
      dispatch(addFoodItems("success"));
    } catch (e) {
      dispatch(error(e));
    }
  };
};

export const foodItemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    getFoodItems: (state, action) => {
      state.foodItems = action.payload;
      state.loading = false;
      state.error = null;
    },
    loading: (state, action) => {
      state.loading = action.payload;
    },
    error: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addFoodItems: (state, action) => {
      state.addMessage = action.payload;
      state.loading = false;
      state.error = null;
    },
    getItemDetails: (state, action) => {
      state.currentItem = action.payload;
      state.loading = false;
      state.error = null;
    },
  },
});

export const { getFoodItems, error, loading, addFoodItems, getItemDetails } =
  foodItemsSlice.actions;
export default foodItemsSlice.reducer;
