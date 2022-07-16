import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { useNavigate,Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getFoodItemsAsync } from "../redux/reducerAndActions/FoodItemsReducer";

const AllFoodItemsScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);
  const { foodItems, loading, error } = useSelector(
    (state) => state.items
  );
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);
  useEffect(() => {
    dispatch(getFoodItemsAsync());
  }, [dispatch]);
  let UI;
  if (loading) {
    UI = <p>loading</p>;
  } else {
    UI = foodItems.map((item) => {
      return (
        <div className="food-item" key={item.id}>
          <div className="img-container">
            <img src={item.imageUrl} alt="food item" />
          </div>
          <div className="content-container">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <Link to={`/details/${item.id}`}>Add to Cart</Link>
          </div>
        </div>
      );
    });
  }
  return (
    <>
      <Navbar />
      <div className="all-food-items-container">{UI}</div>
    </>
  );
};

export default AllFoodItemsScreen;
