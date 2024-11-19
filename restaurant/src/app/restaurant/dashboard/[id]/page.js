"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const EditFoodItem = (props) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [path, setPath] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();

  useEffect(() => {
    handleLoadFoodItem();
  }, []);

  const handleLoadFoodItem = async () => {
    let response = await fetch(
      "http://localhost:3000/api/restaurant/foods/edit/" + props.params.id
    );
    response = await response.json();
    if (response.success) {
      console.log(response.result);
      setName(response.result.name);

      setPrice(response.result.price);
      setPath(response.result.img_path);
      setDescription(response.result.description);
    }
  };

  const handleEditFoodItem = async () => {
    if (!name || !price || !path || !description) {
      setError(true);
      return false;
    } else {
      setError(false);
    }

    console.log(name, price, path, description);

    let response = await fetch(
      "http://localhost:3000/api/restaurant/foods/edit/" + props.params.id,
      {
        method: 'PUT',
        body: JSON.stringify({ name, price, img_path: path, description })
      }
    );

    response = await response.json();
    if (response.success) {
      //alert("data has been updated successfully");
      router.push("../dashboard")
    }
    else{
      alert("Data Is not updated")
    }
  };

  return (
    <div className="container">
      <h1>Update Food Items</h1>
      <div className="input-wrapper">
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          type="text"
          placeholder="Enter Food Item"
          className="input-field"
        />

        {error && !name && (
          <span className="input-error">please enter valid information</span>
        )}
      </div>

      <div className="input-wrapper">
        <input
          value={price}
          onChange={(event) => setPrice(event.target.value)}
          type="text"
          placeholder="Enter Food Price"
          className="input-field"
        />
        {error && !price && (
          <span className="input-error">please enter valid information</span>
        )}
      </div>

      <div className="input-wrapper">
        <input
          value={path}
          onChange={(event) => setPath(event.target.value)}
          type="text"
          placeholder="Enter Image Path"
          className="input-field"
        />
        {error && !path && (
          <span className="input-error">please enter valid information</span>
        )}
      </div>

      <div className="input-wrapper">
        <input
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          type="text"
          placeholder="Enter Food Details"
          className="input-field"
        />
        {error && !description && (
          <span className="input-error">please enter valid information</span>
        )}
      </div>

      <div className="input-wrapper">
        <button className="button" onClick={handleEditFoodItem} style={{backgroundColor:"#2ecc71",padding:"5px"}}>
          Update Food Item
        </button>
      </div>

      <div className="input-wrapper">
        <button onClick={() => router.push("../dashboard")} style={{backgroundColor:"orange",padding:"5px"}}>
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default EditFoodItem;
