import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectionStr } from "@/app/lib/db";
import { orderSchema } from "@/app/lib/ordersModel";
import { restaurantSchema } from "@/app/lib/restaurantsModel";



export async function GET(req,content){
  let id=content.params.id;
  // let result=userId;
    // console.log(id);
  
   let success = false;
  await mongoose.connect(connectionStr, {
    useUnifiedTopology: true, // No need for useNewUrlParser
  });

  let result = await orderSchema.find({ deliveryBoy_id: id });
  //let success = false;
   if(result){
    let restoData= await Promise.all(
      result.map(async(item)=>{
        let restoInfo={};
        restoInfo.data=await restaurantSchema.findOne({_id:item.resto_id});
        restoInfo.amount=item.amount;
        restoInfo.status=item.status;
        return restoInfo;
      })
    )
      result=restoData;
      success = true;
   }

  return NextResponse.json({result,success});
}
