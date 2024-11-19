import { useState } from "react";


const AddFoodItem = (props) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [path, setPath] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(false);

  const handleFoodItem = async () => {
    console.log(name, price, path, description);

    if (!name || !price || !path || !description) {
      setError(true);
      return false;
    } else {
      setError(false);
    }

    let resto_id;
    const restaurantData = JSON.parse(localStorage.getItem("restaurantUser"));
    if (restaurantData) {
      resto_id = restaurantData._id;
    }

    let response = await fetch("http://localhost:3000/api/restaurant/foods", {
      method: "POST",
      body: JSON.stringify({
        name,
        price,
        path,
        img_path: path,
        description,
        resto_id,
      }),
    });

    response = await response.json();

    if (response.success) {
      alert("food item added")
      props.setAddItem(false)
    }
    else{
      alert("food item not added")
    }
  };

  return (
    <div className="container">
      <h1>Add New Food Items</h1>
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
        <button className="button" style={{backgroundColor:"#2ecc71",marginRight:"10px",padding:"10px"}} onClick={handleFoodItem}>
          Add Food Item
        </button>
      </div>
    </div>
  );
};

export default AddFoodItem;
