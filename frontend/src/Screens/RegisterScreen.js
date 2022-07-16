import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { registerAsync } from "../redux/reducerAndActions/userReducer";

const RegisterScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const { loading, error, token,RegisterMessage } = useSelector((state) => state.user);
  useEffect(() => {
    if (token && error == null && loading == false) {
      navigate("/allfooditems");
    }else if(RegisterMessage!=null){
      navigate("/login");
    }
  }, [token, error,loading,navigate,RegisterMessage]);
  const submitHandler = (e) => {
    e.preventDefault();

    var lowerCaseLetters = /[a-z]/g;
    var upperCaseLetters = /[A-Z]/g;
    var numbers = /[0-9]/g;
    if(password.match(lowerCaseLetters)==null || password.match(upperCaseLetters)==null || password.match(numbers)==null){
      alert("Use Alphanumeric");
      return;
    }
    else{
      console.log("something");
    }
    if (password != cPassword) {
      alert("Passwords does not match");
      return;
    }
    let data = {
      userName,
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      role: "User",
    };
    dispatch(registerAsync(data));
  };

  return (
    <>
      <Navbar />
      <div id="form-container">
        <div className="form-wrap">
          <h1>Register</h1>
          {error!=null? <p className="error-container">{error.message}</p> : null}
          <form onSubmit={submitHandler}>
            <div className="form-group">
              <label htmlFor="uname">User Name</label>
              <input
                type="text"
                name="uname"
                id="uname"
                required
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="fname">First Name</label>
              <input
                type="text"
                name="fname"
                id="fname"
                required
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="fname">Last Name</label>
              <input
                type="text"
                name="lname"
                id="lname"
                required
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
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
                minLength="6"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="cpassword">Confirm Password</label>
              <input
                type="password"
                name="cpassword"
                id="cpassword"
                minLength="6"
                required
                onChange={(e) => setCPassword(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="text"
                name="Phone"
                id="phone"
                required
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <button type="submit" className="btn">
              Register
            </button>
          </form>
        </div>
        <footer>
          <p>
            Already have an account? <Link to="/login">Login Here</Link>
          </p>
        </footer>
      </div>
    </>
  );
};

export default RegisterScreen;
