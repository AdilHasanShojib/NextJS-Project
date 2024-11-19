import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectionStr } from "@/app/lib/db";

import { deliveryPartnersSchema } from "@/app/lib/deliverypartnersModel";

export async function POST(req) {
  
  const payload = await req.json();
  let success = false;
  await mongoose.connect(connectionStr, {
    useUnifiedTopology: true, // No need for useNewUrlParser
  });

  const user = new deliveryPartnersSchema(payload);
  const result = await user.save();
  if (result){
    success = true;
  }
  return NextResponse.json({ result, success});
}
