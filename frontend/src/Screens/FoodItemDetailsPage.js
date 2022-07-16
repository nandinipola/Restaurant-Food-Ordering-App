import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getItemDetailsAsync } from "../redux/reducerAndActions/FoodItemsReducer";
import {placeOrderAsync} from "../redux/reducerAndActions/orderReducer"

import Navbar from "../components/Navbar";
const FoodItemDetailsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token , userData} = useSelector((state) => state.user);
  let params = useParams();
  const [qty, setQty] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const { currentItem, loading, error } = useSelector((state) => state.items);
  useEffect(() => {
    dispatch(getItemDetailsAsync(params.id));
  }, [dispatch, params.id]);
  useEffect(() => {
    if (currentItem != null) setTotalPrice(+qty * currentItem.price);
  }, [qty, currentItem]);
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);
  const submitHandler = (e) => {
    e.preventDefault();
    const data = {
      userId:userData.id,
      itemName:currentItem.title,
      totalPrice:totalPrice,
      qty:qty,
      status:'ProcessingOrder',
      payment:'Pending',
      itemId:currentItem.id,
      imageUrl:currentItem.imageUrl,
    };
    dispatch(placeOrderAsync(data));
    navigate("/orders");
  };
  let UI;
  if (loading) {
    UI = <p>Loading ....!</p>;
  } else if (error) {
    UI = <p>{error}</p>;
  } else if (currentItem != null) {
    UI = (
      <div className="item-details-container">
        <div className="item-img-container">
          <img src={currentItem.imageUrl} alt="item food" />
        </div>
        <div className="item-content">
          <h1>
            <span>ItemName :</span>
            {currentItem.title}
          </h1>
          <p>
            <span>Each Item Price :</span> {currentItem.price}
          </p>
          <p>
            <span>Payment :</span> OnlyCash
          </p>
          <form onSubmit={submitHandler}>
            <div className="place-order-f-group">
              <label>Quantity : </label>
              <input
                type="number"
                min="1"
                onChange={(e) => setQty(e.target.value)}
                value={qty}
                required
              />
            </div>
            <div className="place-order-f-group">
              <label>totalPrice : </label>
              <input type="text" readOnly value={totalPrice}  required />
            </div>
            <button>Place Order</button>
          </form>
        </div>
      </div>
    );
  }
  return (
    <>
      <Navbar />
      {UI}
    </>
  );
};

export default FoodItemDetailsPage;
