'use client'

import Link from "next/link";
import {useEffect,useState} from "react";
import {useRouter,usePathname} from "next/navigation";
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
const RestaurantHeader = () => {

  const [details,setDetails] =useState();
  const router= useRouter();
  const pathname = usePathname();

  useEffect(() =>{
      let data = localStorage.getItem("restaurantUser");

      if(!data && pathname=="/restaurant/dashboard"){
        
        router.push("/restaurant");


      }
      else if(data && pathname=="/restaurant"){
        router.push("/restaurant/dashboard");
      }

      else{
        setDetails(JSON.parse(data));

      }

  },[])


  const logout=()=>{

  localStorage.removeItem("restaurantUser");
  router.push("/restaurant");

  }





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
          <Link href="/">
          <FaHome style={{ marginRight: "5px", fontSize: "1.2rem", color: "blue" }} />Home</Link>
        </li>
        {
         
         details && details.name?
         <><li><button onClick={logout}><FaSignOutAlt style={{ marginRight: "5px", fontSize: "1.2rem", color: "blue" }} />Logout</button></li>
         
         </>:<li><Link href="/restaurant"><FaUserPlus style={{ marginRight: "5px", fontSize: "1.2rem", color: "blue" }} />Login/SignUp</Link></li>




        }
        
      </ul>
    </div>
  );
};

export default RestaurantHeader;
