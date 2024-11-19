import { useState } from "react";
import { useRouter } from "next/navigation";

const RestaurantLogin = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      setError(true);
      return false;
    } else {
      setError(false);
    }

    let response = await fetch("http://localhost:3000/api/restaurant", {
      method: "POST",
      body: JSON.stringify({ email, password, login: true }),
    });
    response = await response.json();
    if (response.success) {
      //console.log(response);
      const { result } = response;
      delete result.password;
      localStorage.setItem("restaurantUser", JSON.stringify(result));
      router.push("/restaurant/dashboard");
      
    }

   else{
    alert("Login Failed");

   }


  };
  //console.log(email,password);

  return (
    <>
      
      <div >
        <h1>Login</h1>
        <div className="input-wrapper">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Enter email id"
            className="input-field"
          />
          {error && !email && (
            <span className="input-error">please enter valid information</span>
          )}
        </div>

        <div className="input-wrapper">
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Enter password"
            className="input-field"
          />
          {error && !password && (
            <span className="input-error">please enter valid information</span>
          )}
        </div>

        <div>
          <button className="button" onClick={handleLogin}>
            Login
          </button>
        </div>
      </div>
    </>
  );
};

export default RestaurantLogin;
