import express from "express";
import { addproduct, allproducts, deletepost, delOrdeactivate, findToken, login, logout, signup, updateProduct } from "../controller/admin.controller.js";
import Protectuser from "../middleware/protectedAdmin.js";

const router=express.Router()

router.post("/signup",signup);
router.post("/login",login);
router.post("/logout",logout);
router.post("/addproduct",Protectuser,addproduct);
router.delete("/deletepost/:id",Protectuser,deletepost);
router.post("/update/:id",Protectuser,updateProduct);
router.get("/getposts",Protectuser,allproducts);
router.get("/gettoken",Protectuser,findToken);
router.post("/delOrdeactivate",Protectuser,delOrdeactivate);





export default router;