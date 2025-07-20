import mongoose from "mongoose";

const vendor = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, // (not `require`)
    },
    password:{
        type:String,
        required:true,
        min:6
    },
    gmail:{
        type:String,
        required:true,
    },

    items: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "products",
      },
    ],

    sales: [
      {
        product: {
          type: mongoose.Schema.ObjectId,
          ref: "products",
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Vendor = mongoose.model("Vendor", vendor);
