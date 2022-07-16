import React, { useState, useEffect } from "react";
import {updateOrderAsync} from "../redux/reducerAndActions/orderReducer";
import { useSelector, useDispatch } from "react-redux";

const AdminOrderItem = ({ data }) => {
  const [orderStatus, setOrderStatus] = useState(data.status);
  const [paymentStatus, setPaymentStatus] = useState(data.payment);
  const dispatch = useDispatch();
  useEffect(()=>{
      updateStatusHandler();
  },[paymentStatus,orderStatus])
  const updateStatusHandler = () => {
    const orderUpdated = {
      ...data,
      status: orderStatus,
      payment: paymentStatus,
    };
    console.log(orderUpdated);
    dispatch(updateOrderAsync(orderUpdated));
  };
  return (
    <div className="order-item">
      <div className="img-container">
        <img src={data.imageUrl} alt="food item" />
      </div>
      <p>
        <b>OrderId :</b> {data.id}
      </p>
      <p>
        <b>ItemName :</b> {data.itemName} {"("}
        {data.qty} {")"}
      </p>
      <p>
        <b>Price :</b> {data.totalPrice}
      </p>
      <p>
        <b>Status:</b>
        <select
          value={orderStatus}
          onChange={async (e) => {
            setOrderStatus(e.target.value);
          }}
        >
          <option value="ProcessingOrder">Processing order</option>
          <option value="Cooking">Cooking</option>
          <option value="Ready">Ready to serve</option>
        </select>
      </p>

      <p>
        <b>Payment :</b>
        <select
          value={paymentStatus}
          onChange={async (e) => {
            setPaymentStatus(e.target.value);
          }}
        >
          <option value="Pending">Pending</option>
          <option value="Done">Done</option>
        </select>
      </p>
    </div>
  );
};

export default AdminOrderItem;
