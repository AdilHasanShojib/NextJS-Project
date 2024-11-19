"use client";
import { useState, useEffect } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import RestaurantFooter from "../_components/RestaurantFooter";
import { TAX, DELIVERY_CHARGES } from "../lib/const";
import { useRouter } from "next/navigation";

const Page = () => {
  const [cartStorage, setCartStorage] = useState([]);
  const [total, setTotal] = useState(0);
  const router = useRouter();

  // Load cart data from localStorage when the component mounts
  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];
    setCartStorage(cartData);
    updateTotal(cartData);
  }, []);

  // Function to calculate the total amount
  const updateTotal = (cartData) => {
    const calculatedTotal =
      cartData.length === 0
        ? 0
        : cartData.reduce((acc, item) => acc + item.price, 0);
    setTotal(calculatedTotal);
  };

  const orderNow = () => {
    if (JSON.parse(localStorage.getItem("user"))) {
      router.push("/order");
    } else {
      router.push("/user-auth?order=true");
    }
  };

  const removeFromCart = (id) => {
    const updatedCart = cartStorage.filter((item) => item._id !== id);
    setCartStorage(updatedCart); // Update the cartStorage state
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Update localStorage
    updateTotal(updatedCart); // Recalculate total
  };

  return (
    <div>
      <CustomerHeader />
      <div className="food_item-wrapper">
        {cartStorage.length > 0 ? (
          cartStorage.map((item) => (
            <div className="list-item" key={item._id}>
              <div className="list-item-1">
                <img style={{ width: 100 }} src={item.img_path} alt={item.name} />
              </div>
              <div className="list-item-2">
                <div>{item.name}</div>
                <div className="description">{item.description}</div>
                <button onClick={() => removeFromCart(item._id)}>
                  Remove From Cart
                </button>
              </div>
              <div className="list-item-3">Price: {item.price}</div>
            </div>
          ))
        ) : (
          <h1>No Food Items Added</h1>
        )}
      </div>
      {cartStorage.length > 0 && (
        <div className="total-wrapper">
          <div className="block-1">
            <div className="row">
              <span>Food Charges: </span>
              <span>{total}</span>
            </div>
            <div className="row">
              <span>Tax: </span>
              <span>{(total * TAX) / 100}</span>
            </div>
            <div className="row">
              <span>Delivery Charge:</span>
              <span>{DELIVERY_CHARGES}</span>
            </div>
            <div className="row">
              <span>Total Amount:</span>
              <span>
                {total + DELIVERY_CHARGES + (total * TAX) / 100}
              </span>
            </div>
          </div>
          <div className="block-2">
            <button onClick={orderNow}>Order Now</button>
          </div>
        </div>
      )}
      <RestaurantFooter />
    </div>
  );
};

export default Page;
