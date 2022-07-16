import React, { useState, useEffect} from "react";
import { Link, useNavigate} from "react-router-dom";
import Navbar from "../components/Navbar";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { authenticateAsync } from "../redux/reducerAndActions/userReducer";
const LoginScreen = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const {loading,error, token} = useSelector((state) => state.user);
  useEffect(()=>{
     if(token && error==null && loading==false){
      navigate("/allfooditems");
     }
  },[token, navigate])
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(authenticateAsync(email,password));
  };
  return (
    <>
      <Navbar />
      <div id="form-container">
          <div className="form-wrap">
            <h1>Login</h1>
            {error!=null? <p className="error-container">{error.message}</p> : null}
            <form onSubmit={submitHandler}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {
                !loading ?  <button type="submit" className="btn">
                Login
              </button> : <p>loading...</p>
              }
             
            </form>
          </div>
          <footer>
            <p>
              Don't have an account? <Link to="/register">Register Here</Link>
            </p>
          </footer>
        </div>
    </>
  );
};

export default LoginScreen;
