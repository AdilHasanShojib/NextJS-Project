"use client";
import { useEffect, useState } from "react";
import DeliveryHeader from "../_components/DeliveyHeader";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  const [myOrders, setMyOrders] = useState([]);

  useEffect(() => {
    getMyOrders();
  }, []);

  const getMyOrders = async () => {
    const deliveryData = JSON.parse(localStorage.getItem("delivery"));
    let response = await fetch(
      "http://localhost:3000/api/deliverypartners/orders/" + deliveryData?._id
    );
    response = await response.json();
    if (response.success) {
      setMyOrders(response.result);
    }
  };

  useEffect(() => {
    const delivery = JSON.parse(localStorage.getItem("delivery"));

    if (!delivery) {
      router.push("/deliverypartner");
    }
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("delivery"); // Clear the delivery partner's data
    router.push("/deliverypartner"); // Redirect to the login page
  };

  return (
    <div>
      <DeliveryHeader />
      <h1 style={{ textAlign: "center", color:"orange"}}>My Order List</h1>

      

      {myOrders.length > 0 ? (
  myOrders.map((item, index) => (
    <div
      key={index}
      className="restaurant-wrapper"
      style={{
        marginLeft: "auto",
        marginRight: "auto",
        marginBottom: "20px",
        border: "1px solid #ccc",
        padding: "15px",
        borderRadius: "8px",
        backgroundColor: "orange",
      }}
    >
      <h4>Name: {item.data.name}</h4>
      <div>Amount: {item.amount}</div>
      <div>Address: {item.data.address}</div>
      <div>Status: {item.status}</div>
    </div>
  ))
) : (
  <div
    style={{
      textAlign: "center",
      marginTop: "20px",
      fontSize: "18px",
      color: "#555",
    }}
  >
    No items ordered yet.
  </div>
)}
     <div style={{ textAlign: "center", margin: "20px 0" }}>
        <button
          onClick={handleLogout}
          style={{
            padding: "10px 20px",
            backgroundColor: "#f44336",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>


    </div>
  );
};

export default Page;
