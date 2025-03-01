import React, { useContext, useEffect, useState } from "react";
import "./LoginPop.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { Navigate } from "react-router-dom";
const LoginPop = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState("Login");
  const { url, setToken } = useContext(StoreContext);
  const [data, setData] = useState({    
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  // useEffect(() => {
  //   console.log(data);
  // }, [data]);

  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl = url;
    if (currState === "Login") {
      newUrl = newUrl + "/api/user/login";
    } else {
      newUrl = newUrl + "/api/user/register";
    }

    const response = await axios.post(newUrl, data);
    if (response.data.success) {
      // console.log(response);
      // console.log(response.data.message);
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      setShowLogin(false);
    } else {
      alert(response.data.message);
    }
  };

  
  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            onClick={() => {
              setShowLogin(false);
            }}
            src={assets.cross_icon}
            alt="crossicon"
          />
        </div>
        <div className="login-popup-inputs">
          {currState === "Login" ? (
            <></>
          ) : (
            <input
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              placeholder="Enter your full Name"
              name="name"
              required
            />
          )}

          <input
            type="email"
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            placeholder="Enter your email"
            required
          />
          <input
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            name="password"
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit">
          {currState === "Sign Up" ? "Create Account" : "Login"}
        </button>

        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing , i agree to the terms of use & privacy policy.</p>
        </div>
        {currState === "Sign Up" ? (
          <p>
            Already have an account?{" "}
            <span
              onClick={() => {
                setCurrState("Login");
              }}
            >
              Login here
            </span>
          </p>
        ) : (
          <p>
            Create a new account?
            <span
              onClick={() => {
                setCurrState("Sign Up");
              }}
            >
              Click here
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPop;
