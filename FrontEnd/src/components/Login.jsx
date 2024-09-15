import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSucess } from "../utils";
import axios from "axios";

function Login() {
  const [loginInfo, setLogininfo] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    //here name oenot means the name input field it means key
    const { name, value } = e.target;
    // console.log(name,value);
    const copyLoginInfo = { ...loginInfo };
    copyLoginInfo[name] = value;
    setLogininfo(copyLoginInfo);
  };
  // console.login)
  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) {
      return handleError("email and passowrd are required");
    }
    try {
      const url = "http://localhost:8080/auth/login";
      // const response = await fetch(url,{
      //   method: "POST",
      //   headers :{
      //     'Content-Type' : 'application/json'
      //   }
      // });
      // const result = await response.json();
      const response = await axios.post(url, loginInfo, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", //axios directly sets content-tpye techniaclly we dont need
        },
      });
      const result = response.data;
      console.log(result);
      const { sucess, msg, token, name } = result;
      if (sucess) {
        handleSucess(msg);
        localStorage.setItem("token", token);
        localStorage.setItem("loggedInUser", name);
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      }
    } catch (error) {
      // Catching specific errors
      if (error.response) {
        if (error.response.status === 400) {
          handleError("Password must be at least 8 characters.");
        } else if (error.response.status === 409) {
          handleError("Email or password is incorrect.");
        } else {
          handleError(error.response.data.msg || "An unknown error occurred.");
        }
      } else {
        handleError("An error occurred. Please try again.");
      }
      console.log(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div className="container">
      <h1>Login Page</h1>
      <form onSubmit={handleLogin} action="">
        <div>
          <label htmlFor="email">Email</label>
          <input
            onChange={handleChange}
            type="email"
            name="email"
            autoFocus
            placeholder="Enter Your eamil...."
            value={loginInfo.email}
          />
        </div>
        <div>
          <label htmlFor="passsword">Password</label>
          <input
            onChange={handleChange}
            type="password"
            name="password"
            autoFocus
            placeholder="Enter Your password...."
            value={loginInfo.password}
          />
        </div>
        <button type="submit">Login</button>
        <span>
          <span>Doesn't have an account?</span>
          <Link to="/signUp">Signup</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Login;
