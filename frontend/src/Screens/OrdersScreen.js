import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentUserOrderAsync } from "../redux/reducerAndActions/orderReducer";

const OrdersScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);
  const { currentUserOrders, loading, error } = useSelector(
    (state) => state.orders
  );
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);
  useEffect(() => {
    dispatch(getCurrentUserOrderAsync());
  }, [dispatch]);
  let UI;
  if (loading) {
    UI = <p>Loading ..... !</p>;
  } else if (error) {
    UI = <p>{error}</p>;
  } else {
    UI = currentUserOrders.map((item) => {
      return (
        <div className="order-item" key={item.orderId}>
          <div className="img-container">
            <img src={item.imageUrl} alt="food item" />
          </div>
          <p>
            <b>OrderId :</b> {item.id}
          </p>
          <p>
            <b>ItemName :</b> {item.itemName} {"(" }{item.qty} {")"}
          </p>
          <p>
            <b>Price :</b> {item.totalPrice}
          </p>
          <p>
            <b>Status :</b> {item.status}
          </p>
          <p>
            <b>Payment :</b> {item.payment}
          </p>
        </div>
      );
    });
  }
  return (
    <>
      <Navbar />
      <h1 className="order-title">Your Orders</h1>
      <div className="customer-orders-container">{UI}</div>
    </>
  );
};

export default OrdersScreen;
