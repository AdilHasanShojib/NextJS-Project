"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DeliveryHeader from "../_components/DeliveyHeader";
const Page = () => {
  const [loginMobile, setLoginMobile] = useState();
  const [loginPassword, setLoginPassword] = useState();
  const [error, setError] = useState(false);

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [c_password, setC_password] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState();
  const [passwordError, setPasswordError] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const delivery = JSON.parse(localStorage.getItem("delivery"));

    if (delivery) {
      router.push("/deliverydashboard");
    }
  },[]);

  const handleSignup = async () => {
    console.log(name, mobile, password, c_password, city, address);
    let response = await fetch(
      "http://localhost:3000/api/deliverypartners/signup",
      {
        method: "post",
        body: JSON.stringify({ name, mobile, password, city, address }),
      }
    );

    response = await response.json();
    if (response.success) {
      // alert("User signed up successfully");
      const { result } = response;
      delete result.password;
      localStorage.setItem("delivery", JSON.stringify(result));
      router.push("/deliverydashboard");
    } else {
      alert("failed");
    }
  };

  const handleLogin = async () => {
    let response = await fetch(
      "http://localhost:3000/api/deliverypartners/login",
      {
        method: "POST",
        body: JSON.stringify({ mobile: loginMobile, password: loginPassword }),
      }
    );
    response = await response.json();
    if (response.success) {
      //console.log(response);
      const { result } = response;
      delete result.password;
      localStorage.setItem("delivery", JSON.stringify(result));
      router.push("/deliverydashboard");
    } else {
      alert("Login Failed");
    }
  };

  return (
    <div>
      <DeliveryHeader />
      <h1 style={{ textAlign: "center", fontSize:"50px", color:"orange" }}>Delivery Man</h1>
      <div className="auth-container">
        <div className="login-wrapper">
          <h3>Login</h3>
          <div className="input-wrapper">
            <input
              value={loginMobile}
              onChange={(e) => setLoginMobile(e.target.value)}
              type="text"
              placeholder="Enter mobile number"
              className="input-field"
            />
            {error && !loginMobile && (
              <span className="input-error">
                please enter valid information
              </span>
            )}
          </div>

          <div className="input-wrapper">
            <input
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              type="password"
              placeholder="Enter password"
              className="input-field"
            />
            {error && !loginPassword && (
              <span className="input-error">
                please enter valid information
              </span>
            )}
          </div>

          <div className="input-wrapper">
            <button className="button" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>

        <div className="signup-wrapper">
          <h3>SignUp</h3>
          <div className="input-wrapper">
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              type="text"
              placeholder="Enter Name"
              className="input-field"
            />

            {error && !name && (
              <span className="input-error">please enter information</span>
            )}
          </div>

          <div className="input-wrapper">
            <input
              value={city}
              onChange={(event) => setCity(event.target.value)}
              type="text"
              placeholder="Ente City"
              className="input-field"
            />
            {error && !city && (
              <span className="input-error">please enter information</span>
            )}
          </div>

          <div className="input-wrapper">
            <input
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              type="text"
              placeholder="Enter Full Address"
              className="input-field"
            />
            {error && !address && (
              <span className="input-error">please enter information</span>
            )}
          </div>

          <div className="input-wrapper">
            <input
              value={mobile}
              onChange={(event) => setMobile(event.target.value)}
              type="text"
              placeholder="Enter Mobile Number"
              className="input-field"
            />
            {error && !mobile && (
              <span className="input-error">please enter information</span>
            )}
          </div>

          <div className="input-wrapper">
            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              placeholder="Enter password"
              className="input-field"
            />
            {error && !password && (
              <span className="input-error">please enter information</span>
            )}

            {passwordError && (
              <span className="input-error">
                Password & confirm password not match
              </span>
            )}
          </div>

          <div className="input-wrapper">
            <input
              value={c_password}
              onChange={(event) => setC_password(event.target.value)}
              type="password"
              placeholder="Confirm password"
              className="input-field"
            />
            {error && !c_password && (
              <span className="input-error">please enter information</span>
            )}
            {passwordError && (
              <span className="input-error">
                Password & confirm password not match
              </span>
            )}
          </div>

          <div className="input-wrapper">
            <button className="button" onClick={handleSignup}>
              SignUp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Page;
