const { default: mongoose } = require("mongoose");
const restaurantModel = new mongoose.Schema({
  name: String,
  city: String,
  address: String,
  contact: String,
  email: String,
  password: String
  
});
export const restaurantSchema =
  mongoose.models.restaurants || mongoose.model("restaurants", restaurantModel);
