import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleSucess } from "../utils";
import { ToastContainer } from "react-toastify";
import axios from "axios";

function Home() {
  const [loggedInUser, setLoggedinuser] = useState("");
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedinuser(localStorage.getItem("loggedInUser"));
  }, []);

  const handleLogout = (e) => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    handleSucess("user log ged out sucessfully");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  const fetchProduct = async () => {
    try {
      const url = "http://localhost:8080/product";
      const headers = {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      };
      const response = await axios.get(url, headers);

      const result = response.data;
      console.log(result);
      setProducts(result);
    } catch (err) {
      console.log("error on getting products", err);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div className="home">
      <h1>welcome ,{loggedInUser} ! hope you are doing well.</h1>

      <button onClick={handleLogout}>Logout</button>
      <div>
        {
        //products && products?map((item))
        products.map((product, index) => {
          return (
            <h2 key={index}>
              {product.name} : {product.price}
            </h2>
          );
        })}
      </div>

      <ToastContainer />
    </div>
  );
}

export default Home;
