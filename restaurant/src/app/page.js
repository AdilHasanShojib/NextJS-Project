'use client'
import Image from "next/image";
import styles from "./page.module.css";
import CustomerHeader from "./_components/CustomerHeader";
import RestaurantFooter from "./_components/RestaurantFooter";
import { useEffect, useState } from "react";
import { useRouter} from "next/navigation";

export default function Home() {
  const [locations,setLocations] = useState([]);
  const [selectedLocations,setselectedLocations] = useState('');
  const[showLocation,setShowLocation] = useState(false);
  const [restaurants,setRestaurants] = useState([]);
  const router= useRouter();





  useEffect(() => {
    loadLocations();
    loadRestaurants();
  }, []);

  const loadLocations= async () => {
  let response = await fetch('http://localhost:3000/api/customer/locations');
  response= await response.json();
  if(response.success){

    setLocations(response.result);
  }


  }

  const handleListItem=(item)=>{
    setselectedLocations(item);
    setShowLocation(false);
    loadRestaurants({location: item});
  }


  // console.log(locations);
   
  const loadRestaurants= async (params) =>{
    let url="http://localhost:3000/api/customer";

   if(params?.location){
    url=url+"?location="+params.location

  
   }
   else if(params?.restaurant){
    url=url+"?restaurant="+params.restaurant


   }

    let response = await fetch(url);
    response= await response.json();
    if(response.success){
  
      setRestaurants(response.result);
    }

  }

  return (
    <main>
      <CustomerHeader />
      <div className="main-page-banner">
        <h1>S w i f t  E a t s</h1>
        <div className="input-wrapper">
          <input
            type="text"
            className="select-input"
            placeholder="Select Place"
            value={selectedLocations}
            onClick={()=>setShowLocation(true)}
          />
          <ul className="location-list">
            {
              showLocation && locations.map((item)=>(
                <li onClick={()=>handleListItem(item)}>{item}</li>
              ))
            }
          </ul>



          <input
            type="text"
            className="search-input"
            onChange={(event)=>loadRestaurants({restaurant:event.target.value})}
            placeholder="Enter Restaurant Name"
          />
        </div>
      </div>
      <div className="restaurant-list-container">
    {
        restaurants.map((item)=>(
       
          <div onClick={()=>router.push('explore/'+item.name+"?id="+item._id)} className="restaurant-wrapper"> 
            <div className="heading-wrapper"> 
            <h3>{item.name}</h3>
            <h5>Contact:{item.contact}</h5>
            </div>
            

            <div className="address-wrapper"> 
              <div>{item.city},</div>
              <div className="address"> {item.address}, Email:{item.email}</div>

            </div>
          </div>


        ))

    }


      </div>

      <RestaurantFooter />
    </main>
  );
}
