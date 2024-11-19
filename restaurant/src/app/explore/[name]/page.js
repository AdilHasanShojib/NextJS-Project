"use client";
import CustomerHeader from "@/app/_components/CustomerHeader";
import RestaurantFooter from "@/app/_components/RestaurantFooter";
import { useEffect, useState } from "react";

const page = (props) => {
  const name = props.params.name;
  const [restaurantDetails, setRestaurantDetails] = useState();
  const [foodItems, setFoodItems] = useState([]);
  const [cartData, setCartData] = useState();
  const [cartStorage, setCartStorage] = useState(
    JSON.parse(localStorage.getItem("cart"))
  );
  const [cartIds, setCartIds] = useState(
    cartStorage
      ? () =>
          cartStorage.map((item) => {
            return item._id;
          })
      : []
  );
  const [removeCartdata, setRemoveCartData] = useState();

  useEffect(() => {
    loadRestaurantDetails();
  }, []);
  console.log(cartIds);
  const loadRestaurantDetails = async () => {
    const id = props.searchParams.id;

    let response = await fetch("http://localhost:3000/api/customer/" + id);
    response = await response.json();
    if (response.success) {
      setRestaurantDetails(response.details);
      setFoodItems(response.foodItems);
    }
  };

  const addToCart = (item) => {
    let localCartIds = cartIds;
    localCartIds.push(item._id);
    setCartIds(localCartIds);
    setCartData(item);
  };

  const removeFromCart = (id) => {
    setCartIds((prevCartIds) => {
      const updatedCartIds = prevCartIds.filter((item) => item !== id);
      // Update the localStorage after removing from cart
      const updatedCart = JSON.parse(localStorage.getItem("cart")).filter(
        (item) => item._id !== id
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart));
  
      return updatedCartIds;
    });
  
    // Update the removeCartData state for any further use
    setRemoveCartData(id);
  };
  
 
 
  


  return (
    <div>
      <CustomerHeader cartData={cartData} removeCartdata={removeCartdata} />
      <div className="restro-page-banner">
        <h1>{decodeURI(name)}</h1>
      </div>

      <div className="detail-wrapper">
        <h3>Contact:{restaurantDetails?.contact}</h3>
        <h3>City:{restaurantDetails?.city}</h3>
        <h3>Address:{restaurantDetails?.address}</h3>
        <h3>Email:{restaurantDetails?.email}</h3>
      </div>

      <div className="food_item-wrapper">
        {foodItems.length > 0 ? (
          foodItems.map((item) => (
            <div className="list-item">
              <div>
                <img style={{ width: 100 }} src={item.img_path} />
              </div>

              <div>
                <div>{item.name}</div>
                <div>{item.price}</div>
                <div className="description">{item.description}</div>
                {cartIds.includes(item._id) ? (
                  <button onClick={() => removeFromCart(item._id)}>
                    Remove From Cart
                  </button>
                ) : (
                  <button onClick={() => addToCart(item)}>Add to Cart</button>
                )}
              </div>
            </div>
          ))
        ) : (
          <h1>No Food Items Added </h1>
        )}
      </div>
      <RestaurantFooter />
    </div>
  );
};

export default page;
