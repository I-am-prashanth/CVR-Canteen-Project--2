import express from "express";
import Razorpay from "razorpay";
import { configDotenv } from "dotenv";
import cookieParser from "cookie-parser";
import connect from "./connect.js";
import pay from "./routes/Payment.route.js"
import adminRoute from "./routes/adminRoute.js"
import {v2 as cloudinary} from "cloudinary"


configDotenv()
const app=express();

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API,
    api_secret:process.env.CLOUDINARY_API_KEY,
});

app.use(express.json({limit:"5mb"}))
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());
app.use("/api/payment",pay)
app.use("/api/admin",adminRoute)








app.get("/",(req,res)=>{
    res.status(404).json({name:"prashanth"})
})






const port=process.env.PORT || 3000
app.listen(port,()=>{
  
    connect();
    
    console.log(`port is ruiing at ${port}`)
})
