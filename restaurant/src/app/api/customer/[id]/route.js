import { NextResponse } from "next/server";
import { connectionStr } from "@/app/lib/db";
import mongoose from "mongoose";
import { restaurantSchema } from "@/app/lib/restaurantsModel";
import { foodSchema } from "@/app/lib/foodsModel";


export async function GET(req,content){
 console.log(content.params.id);
const id = content.params.id;
await mongoose.connect(connectionStr,{useNewUrlParser:true})
const details = await restaurantSchema.findOne({_id:id});
const foodItems = await foodSchema.find({resto_id:id});
 return NextResponse.json({success:true,details,foodItems});

}