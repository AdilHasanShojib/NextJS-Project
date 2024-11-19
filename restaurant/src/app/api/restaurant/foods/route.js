import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { foodSchema } from "@/app/lib/foodsModel";

import { connectionStr } from "@/app/lib/db";

export async function POST(req) {
  
  const payload = await req.json();
  let success = false;
  await mongoose.connect(connectionStr, {
    useUnifiedTopology: true, // No need for useNewUrlParser
  });

  const food = new foodSchema(payload);
  const result = await food.save();
  if (result){
    success = true;
  }
  return NextResponse.json({ result, success});
}
