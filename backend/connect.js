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


