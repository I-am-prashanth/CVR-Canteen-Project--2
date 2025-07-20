import mongoose from "mongoose";

const connect=async()=>{
    try{
        const conn=await mongoose.connect(process.env.MONGODB_URL);
        console.log("sucessful connect to database");

    }catch(error){
        console.log("Error occured while connecting to Datbase:",error);
    }

}

export default connect;












// RAZOR_SERECT_KEY=dchK0i7TWDVdgJCMkYS2l7xn
// RAZOR_KEY_ID=rzp_test_tpz7cC0zvhwi5l
// MONGODB_URL=mongodb+srv://prashanthpathigari:prashanth123@cluster0.a1okfj1.mongodb.net/
