import { NextResponse } from "next/server";
import { connectionStr } from "@/app/lib/db";
import { deliveryPartnersSchema } from "@/app/lib/deliverypartnersModel";
import mongoose from "mongoose";




export async function GET(req,content){

    let city=content.params.city;
    let success = false;
    await mongoose.connect(connectionStr, {
        useUnifiedTopology: true, // No need for useNewUrlParser
      });

      let filter={city:{$regex:new RegExp(city,'i')}};
      const result = await deliveryPartnersSchema.find(filter);

    return NextResponse.json({result});



}