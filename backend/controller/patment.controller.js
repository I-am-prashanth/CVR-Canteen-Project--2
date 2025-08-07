// import crypto from "crypto"
import crypto from 'crypto';

import { instance } from "../libs/utils/rajor.js"

import { Product } from "../models/product.model.js";

import { Token } from "../models/token.model.js";


export const getProducts=async(req,res)=>{
    try{
        const{vendor}=req.body;
        const prod=await Product.find({vendor:vendor});
        if(!prod || prod.length==0){
            return res.status(200).json([]);
        }
        return res.status(200).json(prod);

    }catch(error){
        console.log("error occured while consoleing:",error);
        res.status(500).json({message:error.message})
    }
}

export const topay=async(req,res)=>{
    const {amount}=req.body;
    const options={
        amount:Number(amount*100),
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
       
        return res.json({key:process.env.RAZOR_SERECT_KEY})

    }catch(error){
        console.log("eerror accoured",error)
        res.status(500).json({message:error.message});
    }
}

export const generateToken=async(req,res)=>{
    try{
       
        const vendor=req.params.id
        const{items,amount}=req.body;
        console.log(items)
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

        let outToken = await newToken.populate([
  {
    path: 'items.product',
    model: 'Product', // Explicitly specify the model
    select: 'name price' // Select the fields you want
  },
  {
    path: 'vendor',
    model: 'Vendor', // Explicitly specify the model
    select: 'name' // Select the fields you want
  }
]);

        res.status(201).json(outToken);

    }catch(error){
        console.log("error occured while generating token:",error);
        res.status(500).json({error:"error cooured while generating token",message:error.message});
    }
}

export const verifyPayment=async(req,res)=>{
    try{
        const{razorpay_payment_id, razorpay_order_id, razorpay_signature }=req.body;
        const payment = await instance.payments.fetch(razorpay_payment_id);
        const vendor = payment.notes?.vendor;
        let items = [];
        // const itm=payment.notes?.items;
        items = JSON.parse(payment.notes?.items || '[]');
        const amount=payment.notes?.amount;
        // console.log(payment.notes);
        // console.log(items);
        // console.log("Complete Request Body:", JSON.stringify(req.body, null, 2));
        // console.log(notes)
        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const exprectedSignaure=crypto.createHmac("sha256",process.env.RAZOR_SERECT_KEY).update(body.toString()).digest("hex");

        if(exprectedSignaure===razorpay_signature){



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
        if(newToken){ await newToken.save();
            console.log(newToken)
        }
        // console.log(newToken)




            return res.redirect(`http://localhost:5173/payment?referance=${newToken.tokenNumber}`)
        }
        else{
            return res.status(404).json({sucess:false})
        }

    }catch(error){
        console.log("error ocuured while verifying the ",error)
    }

}






export const findToken=async(req,res)=>{
    try{
        console.log("entered")
        const {tokenNumber}=req.body;
        console.log(tokenNumber)
        const token=await Token.findOne({tokenNumber:tokenNumber});
        if(!token){
            return res.status(404).json({message:"can't able to find the token or token expried"});
        }
        
        let outToken = await token.populate([
  {
    path: 'items.product',
    model: 'Product', // Explicitly specify the model
    select: 'name price' // Select the fields you want
  },
  {
    path: 'vendor',
    model: 'Vendor', // Explicitly specify the model
    select: 'name' // Select the fields you want
  }
]);
// console.log(outToken)
        return res.json(outToken)


    }catch(error){
        console.log("error occured while",error);
        res.status(500).json({message:error.message})
    }
}
