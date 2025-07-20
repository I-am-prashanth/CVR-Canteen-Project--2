import Razorpay from "razorpay";
import dotenv from "dotenv";
dotenv.config(); // Load env here too to be safe

export const instance=new Razorpay({
    key_id:process.env.RAZOR_KEY_ID,
    key_secret:process.env.RAZOR_SERECT_KEY
})