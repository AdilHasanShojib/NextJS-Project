import { useState } from "react"

const RestaurantSignup=()=>{
  const [email, setEmail]=useState("");
  const [password, setPassword]=useState("");
  const [c_password, setC_password]=useState("");
  const [name, setName]=useState("");
  const [city, setCity]=useState("");
  const [address, setAddress]=useState("");
  const [contact, setContact]=useState("");


  const handleSignup=async()=>{
    console.log(email,password,c_password,name,city,address,contact);
   let result=await fetch("http://localhost:3000/api/restaurant",{
   method:"post",
   body:JSON.stringify({email,password,name,city,address,contact})

   })

    result= await result. json();
    console.log(result);
    if(result.success){
      alert("Restaurant Registered Successfully")
    }



  }
  


    return(
        <>
        <h3>Signup </h3> 
        <div>
           <div className="input-wrapper">
            <input type="text" placeholder="Enter Email ID" className="input-field" 
            value={email} onChange={(event)=>setEmail(event.target.value)}
            />
           </div>


           <div className="input-wrapper">
            <input type="password" placeholder="Enter Password" className="input-field"
            value={password} onChange={(event)=>setPassword(event.target.value)}
            />
           </div>


           <div className="input-wrapper">
            <input type="password" placeholder="Confirm Password" className="input-field"
            value={c_password} onChange={(event)=>setC_password(event.target.value)}
            />
           </div>



           <div className="input-wrapper">
            <input type="text" placeholder="Enter Restaurant Name" className="input-field"
            value={name} onChange={(event)=>setName(event.target.value)}
            />
           </div>


            <div className="input-wrapper">
            <input type="text" placeholder="Enter City" className="input-field"
            value={city} onChange={(event)=>setCity(event.target.value)}
            />
           </div>

           <div className="input-wrapper">
            <input type="text" placeholder="Enter Full Address" className="input-field"
            value={address} onChange={(event)=>setAddress(event.target.value)}
            />
           </div>

           <div className="input-wrapper">
            <input type="text" placeholder="Enter Contact No." className="input-field"
            value={contact} onChange={(event)=>setContact(event.target.value)}
            />
           </div>



           
           <div className="input-wrapper">
             <button className="button" onClick={handleSignup}>Signup</button>
           </div>
        </div>

        
        </>
    )
}


export default RestaurantSignup