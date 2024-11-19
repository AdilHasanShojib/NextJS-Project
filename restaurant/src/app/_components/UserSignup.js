import { useRouter} from "next/navigation";
import { useState } from "react";


const UserSignUp = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const router= useRouter();

  const handleSignup = async () => {
    console.log(name, email, password, confirmPassword, city, address, mobile);
    let response = await fetch("http://localhost:3000/api/user", {
      method: "post",
      body: JSON.stringify({ name, email, password, city, address, mobile }),
    });

    response = await response.json();
    if (response.success) {
      // alert("User signed up successfully");
      const {result}=response;
      delete result.password;
      localStorage.setItem('user', JSON.stringify(result));
      if(props?.redirect?.order){
        router.push("/order");
      }
      else{
        router.push("/");

      }
      

    } else {
      alert("failed");
    }
  };

  return (
    <div>
      <div className="input-rapper">
        <input
          type="text"
          className="input-field"
          value={name}
          placeholder="Enter name"
          onChange={(event) => setName(event.target.value)}
        />
      </div>

      <div className="input-rapper">
        <input
          type="text"
          className="input-field"
          value={email}
          placeholder="Enter email"
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>
      <div className="input-rapper">
        <input
          type="password"
          className="input-field"
          value={password}
          placeholder="Enter password"
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>

      <div className="input-rapper">
        <input
          type="password"
          className="input-field"
          value={confirmPassword}
          placeholder="confirm password"
          onChange={(event) => setConfirmPassword(event.target.value)}
        />
      </div>

      <div className="input-rapper">
        <input
          type="text"
          className="input-field"
          value={city}
          placeholder="Enter city"
          onChange={(event) => setCity(event.target.value)}
        />
      </div>

      <div className="input-rapper">
        <input
          type="text"
          className="input-field"
          value={address}
          placeholder="Enter address"
          onChange={(event) => setAddress(event.target.value)}
        />
      </div>

      <div className="input-rapper">
        <input
          type="text"
          className="input-field"
          value={mobile}
          placeholder="Enter mobile number"
          onChange={(event) => setMobile(event.target.value)}
        />{" "}
      </div>

      <div className="input-rapper">
        <button className="button" onClick={handleSignup}>
          SignUp
        </button>
      </div>
    </div>
  );
};

export default UserSignUp;
