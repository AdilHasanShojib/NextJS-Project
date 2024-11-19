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

  
  const result = await deliveryPartnersSchema.findOne({mobile: payload.mobile, password: payload.password});
  if (result){
    success = true;
  }
  return NextResponse.json({ result, success});
}