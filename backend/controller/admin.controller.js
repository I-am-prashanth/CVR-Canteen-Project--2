import bcrypt from "bcryptjs";
import { Vendor } from "../models/vendor.model.js";
import { Product } from "../models/product.model.js";
import generate from "../libs/utils/generate.js";
import { Token } from "../models/token.model.js";



export const signup=async(req,res)=>{
    const{name,password,gmail}=req.body;
    try{
        console.log(name," ",password," ",gmail)

        const emailregex=/^\S+@\S+\.\S+$/
        
        if(!emailregex.test(gmail)){//ckecking gmail format
            return res.status(400).json({error:"inavlid email fromat"})
        }
        const salt=await bcrypt.genSalt(10);
        
        const setpass=await bcrypt.hash(password,salt)//hasing the user password

        const findmail=await Vendor.findOne({gmail});//checking any user with same mail exist or not
        if(findmail){
        return res.status(404).json({message:"user whith this already exists"})
        }

        const newVen=new Vendor({//creating the data
            name:name,
            gmail:gmail,
            password:setpass
        })
        if(newVen){
            // generate();
            generate(newVen._id,res)//generating a jwt web token when sucessfully signed up
            await newVen.save();
            res.status(201).json({newVen})
        }




        

    }catch(error){
        console.log("eeror ocuured while ording:",error);
        res.status(500).json({message:error.message})
    }

    

}

export const login=async(req,res)=>{
    try{
        
        const {password,gmail}=req.body;
        let user=null;
        if(!gmail){//gmail is mandedatory (either username or phonenumber or gmail)
            res.status(404).json({message:"invalid intities || usernot exist"})
        }
        else{
            //finding the user exist with give data(username)
            user=await Vendor.findOne({gmail})//checking with gmail
     
        }
    if(!user) res.status(404).json({message:"unable to find user with giver credentails"})
    
    //before login it checking the given password
        const checkpass=await bcrypt.compare(password,user.password);

        if(!checkpass) res.status(500).json({message:"invalid password"})
        
        generate(user._id,res)
   
        res.status(201).json(user)

    }catch(error){
        console.log(error);
        res.status(500).json({message:"error occured while login:"+error.message})
    }
}

export const addproduct=async(req,res)=>{
    try{
        const{name,img,descrition,price}=req.body;
        if(!name || !img || !price){
            res.status(404).json({message:"all flied required"});
        }
        const prod=new Product({
            name:name,
            vendor:req.user._id,
            img:img,
            descrition:descrition,
            price:price
        });
        if(prod){
            await prod.save();
            await Vendor.updateOne({_id:req.user._id},{$push:{items:prod._id}})
            res.status(201).json(prod);

        }
            
        
    res.status(401).json({message:"unable to create a product"})

    }catch(error){
        console.log("got error while fetching  posts",error)
        res.status(500).json({message:error.message})
    }
}

export const deletepost=async(req,res)=>{
    try{
        // const{name,img,descrition,price}=req.body;
        
        const product_id=req.params.id

        const findProduct=await Product.findById({
            vendor:req.user._id,
            _id:product_id
        });
        if(!findProduct)return res.status(404).json({message:"admin don't have this product"});

    await Product.findByIdAndDelete(product_id);
    await Vendor.findByIdAndUpdate(
  req.user._id,
  {
    $pull: { items: product_id } // product_id must be the ObjectId or string
  },
  { new: true }
);
        
   
    res.status(200).json(req.user.items)

    }catch(error){
        console.log("got error while fetching  posts",error)
        res.status(500).json({message:error.message})
    }
}

export const logout=async(req,res)=>{
    try{
        //simply jwt get expired i.e., automaticall get deleted
        res.cookie("jwt","",{maxAge:0})
        res.status(200).json({message:"sucessfully logged out!!!"})
    }catch(error){
        console.log("unable to logout:",error)
        res.status(500).json({message:error.message})
    }
}

export const allproducts=async(req,res)=>{
    try{
        const posts=await Product.find({vendor:req.user._id}).lean()
        if(!posts){
            res.status(200).json([])
        }
        return res.status(200).json(posts)

    }catch(error){
        console.log("error occure while fetching all products:",error);
        res.status(500).json({message:error.message});
    }
}

export const updateProduct=async(req,res)=>{
    try{
        const{name,img,descrition,price}=req.body;
        
        const product_id=req.params.id

        const findProduct=await Product.findById({
            vendor:req.user._id,
            _id:product_id
        });
        if(!findProduct)return res.status(404).json({message:"admin don't have this product"});

    const updatedProduct=await Product.findByIdAndUpdate(findProduct._id,{
        name:name || findProduct.name,
        img:img || findProduct.img,
        descrition:descrition ||findProduct.descrition ,
        price:price || findProduct.price
    } ,{ new: true } );
    
        
            
        
    res.status(200).json(updatedProduct)

    }catch(error){
        console.log("got error while fetching  posts",error)
        res.status(500).json({message:error.message})
    }
}


export const findToken=async(req,res)=>{
    try{
        const {tokenNumber}=req.body;
        const token=await Token.findOne({tokenNumber:tokenNumber});
        if(!token){
            return res.status(404).json({message:"can't able to find the token or token expried"});
        }
        if(token.vendor.toString()!==req.user._id.toString()){
            return res.status(404).json({message:"token found but for outher vendor Or wrongly paid"})
        }
        return res.json(token)


    }catch(error){
        console.log("error occured while",error);
        res.status(500).json({message:error.message})
    }
}


export const delOrdeactivate=async(req,res)=>{
    try{
        // const tokenNumber=req.params.id;
        const {tokenNumber,oper}=req.body;
        const token=await Token.findOne({tokenNumber:tokenNumber});
        if(!token){
            return res.status(404).json({message:"can't able to find the token or token expried"});
        }
        if(token.vendor.toString()!==req.user._id.toString()){
            return res.status(404).json({message:"token found but for outher vendour"})
        }
        if(oper=="delete"){
            await token.deleteOne();
            
        }
        else{
            await token.updateOne({ isValid: false });
        }
        return res.json(token)


    }catch(error){
        console.log("error occured while")
    }
}