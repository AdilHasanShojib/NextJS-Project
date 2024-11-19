"use client";

import { useState } from "react";
import RestaurantLogin from "../_components/RestaurantLogin";
import RestaurantSignup from "../_components/RestaurantSignup";
import RestaurantHeader from "../_components/RestaurantHeader";
import './style.css';
import RestaurantFooter from "../_components/RestaurantFooter";

const Restaurant = () => {
  const [login, setLogin] = useState(true);
  return (
    <>
      <div className="container">
        <RestaurantHeader/>
        <h1 style={{fontSize:"50px", color:"orange"}}>Restaurant Owner</h1>
        {login ? <RestaurantLogin /> : <RestaurantSignup />}

        <div>
          
            <button className="button-link" onClick={() => setLogin(!login)}>
              {login
                ? "Don't Have an Account? SignUp"
                : "Already Have an Account? Login"}
            </button>
          
        </div>
      </div>
      <RestaurantFooter/>
    </>
  );
};

export default Restaurant;
