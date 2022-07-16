import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { getAllOrderAsync } from "../redux/reducerAndActions/orderReducer";
import AdminOrderItem from "../components/AdminOrderItem";

const AdminOrderPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { allOrders, loading, error } = useSelector((state) => state.orders);
  const { token, userData } = useSelector((state) => state.user);
  useEffect(() => {
    if ((token==null || userData==null) || ( userData!=null && userData.role !="Admin" )) {
      navigate("/login");
    }
  }, [token, navigate]);
  useEffect(() => {
    dispatch(getAllOrderAsync());
  }, [dispatch]);
  let UI;
  if (loading) {
    UI = <p>Loadin.....!</p>;
  } else if (error) {
    UI = <p>{error}</p>;
  } else {
    UI = allOrders.map((item) => {
      return <AdminOrderItem data={item} key={item.orderId} />;
    });
  }
  return (
    <>
      <Navbar />
      <h1 className="order-title">All Orders</h1>
      <div className="customer-orders-container">
        {UI}
      </div>
    </>
  );
};

export default AdminOrderPage;
