import { NextResponse } from "next/server";
import { restaurantSchema } from "@/app/lib/restaurantsModel";
import mongoose from "mongoose";
import { connectionStr } from "@/app/lib/db";

// Helper function to connect to MongoDB
async function connectToDB() {
  if (mongoose.connection.readyState === 0) {
    // If not connected, then connect
    await mongoose.connect(connectionStr, {
      useUnifiedTopology: true, // No need for useNewUrlParser
    });
  }
}

export async function GET() {
  try {
    // Connect to the database
    await connectToDB();

    // Query the restaurant collection
    const data = await restaurantSchema.find();

    // Log the data (optional)
    console.log(data);

    // Return the response
    return NextResponse.json({ result: true, data });
  } catch (error) {
    console.error("Error fetching restaurants:", error);

    // Return an error response
    return NextResponse.json({ result: false, error: error.message });
  }
}

export async function POST(request) {
  let payload = await request.json();
  let result;
  let success = false;
  await mongoose.connect(connectionStr, {
    useUnifiedTopology: true, // No need for useNewUrlParser
  });

  if (payload.login) {
    result = await restaurantSchema.findOne({
      email: payload.email,
      password: payload.password,
    });
    if (result) {
      success = true;
    }
  } else {
    const restaurant = new restaurantSchema(payload);
    result = await restaurant.save();
    if (result) {
      success = true;
    }
  }

  return NextResponse.json({ result, success });
}
