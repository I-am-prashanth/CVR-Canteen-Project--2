import { instance } from "../libs/utils/rajor.js"
// import tokens from "razorpay/dist/types/tokens.js";
import { Token } from "../models/token.model.js";

export const topay=async(req,res)=>{
    const options={
        amount:Number(1000*100),
        currency:"INR",
    }
    try{
        const order=await instance.orders.create(options); 
        if(!order){
            res.status(404).json({message:"unable to create a aorder"})

        }
        res.status(200).json({
            success:true,
            order
        })

    }catch(error){
        console.log("eeror ocuured while ording:",error);
        res.status(500).json({message:error.message})
    }

    

}


export const getkey=async(req,res)=>{
    try{
        const {stall}=req.params;
        const shop=await vendor.findone({stall}) 
        const key=shop.name+"_RAZOR_SERECT_KEY"
        const value=process.env[key]
        return res.json({key:value})

    }catch(error){
        console.log("eerror accoured",error)
        res.status(500).json({message:error.message});
    }
}

export const generateToken=async(req,res)=>{
    try{
        const vendor=req.params.id
        const{items,amount}=req.body;
        //saving today in dateOnly and setting hours in day
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);
        const dateOnly = startOfDay.toISOString().split("T")[0]; // Get "YYYY-MM-DD"
        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        //count number of tokens created on today
        const count = await Token.countDocuments({
        createdAt: {
            $gte: startOfDay,
            $lte: endOfDay
        }
        });
        //geerating a random string so no one could guess the token help in fraud detection
        const randomString = Math.random().toString(36).substring(2, 6);

        const newToken=new Token({
            vendor:vendor || "687bd8107a00bf8c168dc598",
            tokenNumber:dateOnly+" "+randomString+" "+(count+1),
            amount:amount,
            items:items,
        })
        if(newToken) await newToken.save();
        res.status(201).json(newToken);

    }catch(error){
        console.log("error occured while generating token:",error);
        res.status(500).json({error:"error cooured while generating token",message:error.message});
    }
}

