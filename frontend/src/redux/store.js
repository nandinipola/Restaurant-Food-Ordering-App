import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducerAndActions/userReducer";
import foodItemsReducer from "./reducerAndActions/FoodItemsReducer";
import orderReducer from "./reducerAndActions/orderReducer";

export const store = configureStore({
    reducer: {
      user: userReducer,
      items:foodItemsReducer,
      orders:orderReducer,
    },
  });
  