import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectionStr } from "@/app/lib/db";
import { orderSchema } from "@/app/lib/ordersModel";
import { restaurantSchema } from "@/app/lib/restaurantsModel";

export async function POST(req) {
  const payload = await req.json();

  await mongoose.connect(connectionStr, {
    useUnifiedTopology: true, // No need for useNewUrlParser
  });

  let success = false;

  const orderobj = new orderSchema(payload);
  const result = await orderobj.save();
  if (result) {
    success = true;
  }
  return NextResponse.json({ result, success });
}

export async function GET(req){
  let userId=req.nextUrl.searchParams.get("id");
  // let result=userId;
   let success = false;
  await mongoose.connect(connectionStr, {
    useUnifiedTopology: true, // No need for useNewUrlParser
  });

  let result = await orderSchema.find({user_id:userId});
  //let success = false;
   if(result){
    let resoData= await Promise.all(
      result.map(async(item)=>{
        let restoInfo={};
        restoInfo.data=await restaurantSchema.findOne({_id:item.resto_id});
        restoInfo.amount=item.amount;
        restoInfo.status=item.status;
        return restoInfo;
      })
    )
      result=resoData;
      success = true;
   }

  return NextResponse.json({result,success});
}
