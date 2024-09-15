import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSucess } from "../utils";
import axios from "axios";

function Signup() {
  const [signupInfo, setSignupinfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    //here name oenot means the name input field it means key
    const { name, value } = e.target;
    // console.log(name,value);
    const copySignupInfo = { ...signupInfo };
    copySignupInfo[name] = value;
    setSignupinfo(copySignupInfo);
  };
  // console.log('signupInfo ->',signupInfo)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;
    if (!name || !email || !password) {
      return handleError("name ,email and passowrd are required");
    }
    try {
      const url = "http://localhost:8080/auth/signup";
      // const response = await fetch(url,{
      //   method: "POST",
      //   headers :{
      //     'Content-Type' : 'application/json'
      //   },
      //   body : JSON.stringify(signupInfo)
      // });
      // const result = await response.json();
      const response = await axios.post(url, signupInfo, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",   //axios directly sets content-tpye techniaclly we dont need
        },
      });
      const result = response.data
      console.log(result);
      const {sucess ,msg,AxiosError} = result;
      if(sucess){
        handleSucess(msg);
        setTimeout(() => {
         navigate("/login") 
        }, 1000);
      }
      
    } catch (error) {
      if (error.response && error.response.status === 400) {
        handleError("Password must be at least 8 characters.");
      } else {
        handleError("An error occurred. Please try again.");
      }
      console.log("Error:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="container">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit} action="">
        <div>
          <label htmlFor="name">Name</label>
          <input
            onChange={handleChange}
            type="text"
            name="name"
            autoFocus
            placeholder="Enter Your name...."
            value={signupInfo.name}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            onChange={handleChange}
            type="email"
            name="email"
            autoFocus
            placeholder="Enter Your eamil...."
            value={signupInfo.email}
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
            value={signupInfo.password}
          />
        </div>
        <button type="submit">Signup</button>
        <span>
          Already have an acount?
          <Link to="/login">Login</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Signup;
