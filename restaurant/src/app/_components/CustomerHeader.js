'use client'
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaHome, FaUtensils, FaTruck, FaShoppingCart, FaUser, FaSignOutAlt, FaSignInAlt, FaUserPlus } from "react-icons/fa";

const CustomerHeader = (props) => {
  const cartStorage = localStorage.getItem("cart") && JSON.parse(localStorage.getItem("cart"));
  const [cartNumber, setCartNumber] = useState(cartStorage?.length);
  const [cartItem, setCartItem] = useState(cartStorage);
  const userStorage = localStorage.getItem("user") && JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(userStorage ? userStorage : undefined);
  const router = useRouter();

  useEffect(() => {
    if (props.cartData) {
      if (cartNumber) {
        if (cartItem[0].resto_id != props.cartData.resto_id) {
          localStorage.removeItem("cart");
          setCartNumber(1);
          setCartItem([props.cartData]);
          localStorage.setItem("cart", JSON.stringify([props.cartData]));
        } else {
          let localCartItem = cartItem;
          localCartItem.push(JSON.parse(JSON.stringify(props.cartData)));
          setCartItem(localCartItem);
          setCartNumber(cartNumber + 1);
          localStorage.setItem("cart", JSON.stringify(localCartItem));
        }
      } else {
        setCartNumber(1);
        setCartItem([props.cartData]);
        localStorage.setItem("cart", JSON.stringify([props.cartData]));
      }
    }
  }, [props.cartData]);

  useEffect(() => {
    if (props.removeCartData) {
      const localCartItem = cartItem.filter(
        (item) => item._id !== props.removeCartData
      );
      setCartItem(localCartItem);
      setCartNumber(localCartItem.length);
      localStorage.setItem("cart", JSON.stringify(localCartItem));

      if (localCartItem.length === 0) {
        localStorage.removeItem("cart");
      }
    }
  }, [props.removeCartData]);

  useEffect(() => {
    if (props.removeData) {
      setCartItem([]);
      setCartNumber(0);
      localStorage.removeItem("cart");
    }
  }, [props.removeData]);

  const logout = () => {
    localStorage.removeItem("user");
    router.push("/user-auth");
  };

  return (
    <div className="header-wrapper">
      <div className="logo">
        <img
          style={{ width: 100 }}
          src="https://www.odtap.com/wp-content/uploads/2018/10/food-delivery.jpg"
          alt="Logo"
        />
      </div>
      <ul>
        <li>
          <Link href="/">
            <FaHome style={{ marginRight: "5px", fontSize: "1.2rem", color: "blue" }} /> Home
          </Link>
        </li>
        <li>
          <Link href="/restaurant">
            <FaUtensils style={{ marginRight: "5px", fontSize: "1.2rem", color: "blue" }} /> Add Restaurant
          </Link>
        </li>
        <li>
          <Link href="/deliverypartner">
            <FaTruck style={{ marginRight: "5px", fontSize: "1.2rem", color: "blue" }} /> Delivery Partner
          </Link>
        </li>
        <li>
          <Link href={cartNumber ? "/cart" : "#"}>
            <FaShoppingCart style={{ marginRight: "5px", fontSize: "1.2rem", color: "blue" }} /> Cart ({cartNumber ? cartNumber : 0})
          </Link>
        </li>

        {user ? (
          <>
            <li>
              <Link href="/myprofile">
                <FaUser style={{ marginRight: "5px", fontSize: "1.2rem", color: "blue" }} /> {user?.name}
              </Link>
            </li>
            <li>
              <button onClick={logout}>
                <FaSignOutAlt style={{ marginRight: "5px", fontSize: "1.2rem", color: "blue" }} /> Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/user-auth">
                <FaSignInAlt style={{ marginRight: "5px", fontSize: "1.2rem", color: "blue" }} /> Login
              </Link>
            </li>
            <li>
              <Link href="/user-auth">
                <FaUserPlus style={{ marginRight: "5px", fontSize: "1.2rem", color: "blue" }} />Sign Up
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default CustomerHeader;
