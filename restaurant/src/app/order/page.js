"use client";
import { useEffect, useState } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import RestaurantFooter from "../_components/RestaurantFooter";
import { TAX } from "../lib/const";
import { DELIVERY_CHARGES } from "../lib/const";
import { useRouter} from "next/navigation";

const Page = () => {
  const [userStorage, setUserStorage] = useState(
    JSON.parse(localStorage.getItem("user"))
  );
  const [cartStorage, setCartStorage] = useState(
    JSON.parse(localStorage.getItem("cart"))
  );

  const [total] = useState(() =>
    cartStorage?.length === 1
      ? cartStorage[0].price
      : cartStorage?.reduce((acc, item) => acc + item.price, 0)
  );
  console.log(total);

  const [removeData,setRemoveData] = useState(false);
  const router= useRouter();

  useEffect(()=>{

if(!total){
  router.push('/');
}

  },[total])


  const orderNow=async()=>{
    let user_id =JSON.parse(localStorage.getItem('user'))._id;
    let city =JSON.parse(localStorage.getItem('user')).city;
    let cart =JSON.parse(localStorage.getItem('cart'));
    let foodItemIds =cart.map((item)=>item._id).toString();
    let deliveryBoyResponse= await fetch('http://localhost:3000/api/deliverypartners/'+city);
    deliveryBoyResponse= await deliveryBoyResponse.json();
    let deliveryBoyIds=deliveryBoyResponse.result.map((item)=>item._id);
    let deliveryBoy_id =deliveryBoyIds[Math.floor(Math.random()*deliveryBoyIds.length)];
    console.log(deliveryBoy_id);
    if(!deliveryBoy_id){
      alert("Sorry! Delivery Partner Not Available")
      return false;
    }
    
    
    let resto_id =cart[0].resto_id;
    
    let collection = {
      user_id,
      resto_id,
      foodItemIds,
      deliveryBoy_id,
      status: 'confirm',
      amount: total+DELIVERY_CHARGES+(total * TAX)/100,
    };

    
    let response = await fetch('http://localhost:3000/api/order',{
      method:"POST",
      body:JSON.stringify(collection),
    });
    response = await response.json();
    if (response.success) {
      alert("Order Confirmed!");
      setRemoveData(true);
      router.push('/myprofile');
    } else {
      alert("Order Failed!");
    }
    console.log(collection);

  };





  
  return (
    <div>
      <CustomerHeader removeData={removeData} />

      <div className="total-wrapper">
        <div className="block-1">
          <h2 style={{textAlign:"center"}}>User Details</h2>

          <div className="row">
            <span>Name: </span>
            <span>{userStorage.name}</span>
          </div>

          <div className="row">
            <span>Address: </span>
            <span>{userStorage.address}</span>
          </div>

          <div className="row">
            <span>Mobile: </span>
            <span>{userStorage.mobile}</span>
          </div>

          <h2 style={{textAlign:"center"}}>Ammount Details</h2>
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
            <span>{total + DELIVERY_CHARGES + (total * TAX) / 100}</span>
          </div>
          <h2 style={{textAlign:"center"}}>Payment Method</h2>
          <div className="row">
            <span>Cash on Delivery:</span>
            <span>{total + DELIVERY_CHARGES + (total * TAX) / 100}</span>
          </div>
        </div>
        <div className="block-2">
          <button onClick={orderNow}>Place Your Order Now</button>
        </div>
      </div>
      <RestaurantFooter />
    </div>
  );
};

export default Page;
