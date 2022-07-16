import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { addFoodItemsAsync } from "../redux/reducerAndActions/FoodItemsReducer";

const AddFoodItems = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const dispatch = useDispatch();
  const { loading, error, addMessage } = useSelector((state) => state.items);
  const { token , userData} = useSelector((state) => state.user);
  useEffect(() => {
    if ((token==null || userData==null) || ( userData!=null && userData.role !="Admin" )) {
      navigate("/login");
    }
  }, [token, navigate]);
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(title, imageUrl, description);
    dispatch(addFoodItemsAsync(title,imageUrl,description,price));
  };
  return (
    <>
      <Navbar />
      <div id="form-container">
        <div className="form-wrap">
          <h1>Add Food Item</h1>
          {error && <p className="error-container">{error.message}</p>}
          {addMessage && <p className="success-container">{addMessage}</p>}
          <form onSubmit={submitHandler}>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                name="title"
                id="title"
                required
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="img">Image Url</label>
              <input
                type="text"
                name="img"
                id="img"
                required
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="img">Price</label>
              <input
                type="text"
                name="img"
                id="img"
                required
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="desc">Description</label>
              <textarea
                name="desc"
                id="desc"
                required
                onChange={(e) => setDescription(e.target.value)}
                rows="5"
              ></textarea>
            </div>
            {!loading ? (
              <button type="submit" className="btn">
                Add
              </button>
            ) : (
              <p>Loading....!</p>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default AddFoodItems;
