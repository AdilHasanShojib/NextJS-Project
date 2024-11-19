import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectionStr } from "@/app/lib/db";
import { userSchema } from "@/app/lib/userModel";

export async function POST(req) {
  
  const payload = await req.json();
  let success = false;
  await mongoose.connect(connectionStr, {
    useUnifiedTopology: true, // No need for useNewUrlParser
  });

  
  const result = await userSchema.findOne({email: payload.email, password: payload.password});
  if (result){
    success = true;
  }
  return NextResponse.json({ result, success});
}