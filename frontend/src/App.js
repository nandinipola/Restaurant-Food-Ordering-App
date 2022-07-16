import React from 'react'
import { Routes, Route} from "react-router-dom";
import AddFoodItems from './Screens/AddFoodItems';
import AdminOrderPage from './Screens/AdminOrderPage';
import AllFoodItemsScreen from './Screens/AllFoodItemsScreen';
import FoodItemDetailsPage from './Screens/FoodItemDetailsPage';
import HomeScreen from './Screens/HomeScreen'
import LoginScreen from './Screens/LoginScreen'
import OrdersScreen from './Screens/OrdersScreen';
import RegisterScreen from './Screens/RegisterScreen'

const App = () => {
  return (
   <>
    <Routes>
        <Route path="/"  exact element={<HomeScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/add-item" element={<AddFoodItems />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/allfooditems" element={<AllFoodItemsScreen />} />
        <Route path="/details/:id" element={<FoodItemDetailsPage />} />
        <Route path="/orders" element={<OrdersScreen />} />
        <Route path="/admin-orders" element={<AdminOrderPage />} />
      </Routes>
   </>

  )
}

export default App