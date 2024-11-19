import { useRouter } from "next/navigation";
import { useState } from "react";

const RestaurantSignup = () => {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [c_password, setC_password] = useState("");
  const router = useRouter();

  const [error, setError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleSignup = async () => {
    if (password !== c_password) {
      setPasswordError(true);
      return false;
    } else {
      setPasswordError(false);
    }

    if (
      !name ||
      !city ||
      !address ||
      !contact ||
      !email ||
      !password ||
      !c_password
    ) {
      setError(true);
      return false;
    } else {
      setError(false);
    }

    console.log(name, city, address, contact, email, password, c_password);
    let response = await fetch("http://localhost:3000/api/restaurant", {
      method: "POST",
      body: JSON.stringify({ name, city, address, contact, email, password }),
    });

    response = await response.json();

    if (response.success) {
      console.log(response);
      const { result } = response;
      delete result.password;
      localStorage.setItem("restaurantUser", JSON.stringify(result));
      router.push("/restaurant/dashboard");
    }
  };

  return (
    <>
      <h1>Signup</h1>
      <div>
        <div className="input-wrapper">
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            type="text"
            placeholder="Enter Restaurant Name"
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
            value={contact}
            onChange={(event) => setContact(event.target.value)}
            type="text"
            placeholder="Enter Contact No."
            className="input-field"
          />
          {error && !contact && (
            <span className="input-error">please enter information</span>
          )}
        </div>

        <div className="input-wrapper">
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            type="text"
            placeholder="Enter Email"
            className="input-field"
          />
          {error && !email && (
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

        <div>
          <button className="button" onClick={handleSignup}>
            SignUp
          </button>
        </div>
      </div>
    </>
  );
};

export default RestaurantSignup;
