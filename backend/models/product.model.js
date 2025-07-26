import mongoose from "mongoose";

const product = new mongoose.Schema(
  {
    vendor:{
      type:mongoose.Schema.ObjectId,
      ref:'Vendor'
    },
    name: {
      type: String,
      required: true, // (not `require`)
    },
    img:{
      type:String,
      // required:true
    },
    descrition:{
      type:String
    },
    price:{
      type:Number,
      required:true,
      min: 0,
    
    }
        
  },
  {
    timestamps: true,
  }
);

export const Product = mongoose.model("Product", product);
