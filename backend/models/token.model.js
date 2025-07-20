import mongoose from "mongoose";

const token = new mongoose.Schema(
  {
    vendor:{
      type:mongoose.Schema.ObjectId,
      ref:'Vendor'
    },
    tokenNumber: {
      type: String,
      required: true, // (not `require`)
    unique: true,
    },


    items: [
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    }
  }
]
    ,
    
    amount:{
      type:Number,
      required:true,
      min: 0,
    
    },
    isValid:{
    type:Boolean,
    default:true
  }
        
  },
  {
    timestamps: true,
  },
  
);

export const Token = mongoose.model("Token", token);
