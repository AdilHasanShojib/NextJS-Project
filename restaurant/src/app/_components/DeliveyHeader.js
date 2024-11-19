"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaHome,
  FaUtensils,
  FaTruck,
  FaShoppingCart,
  FaUser,
  FaSignOutAlt,
  FaSignInAlt,
  FaUserPlus,
} from "react-icons/fa";

const DeliveryHeader = (props) => {
  return (
    <div className="header-wrapper">
      <div className="logo">
        <img
          style={{ width: 100 }}
          src="https://www.odtap.com/wp-content/uploads/2018/10/food-delivery.jpg"
        ></img>
      </div>
      <ul>
        <li>
          {" "}
          <Link href="/">
            <FaHome
              style={{ marginRight: "5px", fontSize: "1.2rem", color: "blue" }}
            />
            Home
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default DeliveryHeader;
