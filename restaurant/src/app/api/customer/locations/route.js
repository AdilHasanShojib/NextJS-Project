import { connectionStr } from "@/app/lib/db";
import { restaurantSchema } from "@/app/lib/restaurantsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(){
    await mongoose.connect(connectionStr,{useNewUrlParser:true})
    let result= await restaurantSchema.find();
     result=result.map((res) => res.city.charAt(0).toUpperCase()+res.city.slice(1));
     result=[...new Set(result.map((res) => res))];


    return NextResponse.json({success: true,result})
}